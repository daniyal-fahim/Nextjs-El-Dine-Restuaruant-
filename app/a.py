from ortools.sat.python import cp_model
import math
import random

def create_distance_matrix(cities):
    n = len(cities)
    dist_matrix = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if i != j:
                dx = cities[i][0] - cities[j][0]
                dy = cities[i][1] - cities[j][1]
                dist_matrix[i][j] = round(math.sqrt(dx*dx + dy*dy))
    return dist_matrix

def solve_tsp(cities):
    num_cities = len(cities)
    dist_matrix = create_distance_matrix(cities)
    
    model = cp_model.CpModel()
    
    next_city = [model.NewIntVar(0, num_cities-1, f'next_{i}') for i in range(num_cities)]
    is_last = [model.NewBoolVar(f'last_{i}') for i in range(num_cities)]
    
    for i in range(num_cities):
        model.Add(next_city[i] != i)
        model.Add(is_last[i] == (next_city[i] == 0))
    
    model.Add(sum(is_last) == 1)
    
    active = [model.NewBoolVar(f'active_{i}') for i in range(num_cities)]
    model.Add(active[0] == 1)
    
    for i in range(1, num_cities):
        model.Add(active[i] == 0).OnlyEnforceIf(is_last[i])
        model.Add(active[i] == 1).OnlyEnforceIf(is_last[i].Not())
    
    for i in range(num_cities):
        for j in range(num_cities):
            if i != j:
                model.Add(next_city[i] == j).OnlyEnforceIf(active[j])
    
    total_distance = model.NewIntVar(0, 100000, 'total_distance')
    model.Add(total_distance == sum(
        dist_matrix[i][next_city[i]] * active[i] for i in range(num_cities)
    ))
    
    model.Minimize(total_distance)
    
    solver = cp_model.CpSolver()
    status = solver.Solve(model)
    
    if status == cp_model.OPTIMAL:
        route = [0]
        current = 0
        while True:
            next_c = solver.Value(next_city[current])
            if next_c == 0:
                break
            route.append(next_c)
            current = next_c
        route.append(0)
        return route, solver.ObjectiveValue()
    else:
        return None, None

cities = [(random.randint(0, 100), random.randint(0, 100)) for _ in range(10)]
print("Cities (x,y coordinates):")
for i, city in enumerate(cities):
    print(f"City {i}: {city}")

route, distance = solve_tsp(cities)

if route:
    print("\nOptimal route:")
    print(" -> ".join(f"City {i}" for i in route))
    print(f"Total distance: {distance}")
else:
    print("No solution found.")