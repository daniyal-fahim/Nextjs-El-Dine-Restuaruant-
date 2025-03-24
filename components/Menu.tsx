"use client"

import Link from "next/link";
import { useEffect } from "react";
import Product from "./Product"; // Import Product component

const FoodMenu = () => {
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 60, behavior: "smooth" });
      }
    };

    document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    return () => {
      document.querySelectorAll("a[href^='#']").forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
    };
  }, []);

  return (
    <div>
      {/* Navbar for Food Categories */}
      <nav className="sticky top-16 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <ul className="flex flex-wrap justify-center gap-2 px-4 py-3">
        {["Seafood", "Healthy Food", "Fast Food", "Desserts", "Beverages", "Vegan Dishes"].map(
          (item, index) => (
            <li key={index} className="bg-red-600 px-3 py-2 rounded text-sm">
              <Link href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</Link>
            </li>
          )
        )}
      </ul>
    </nav>

      {/* Sections */}
      <section id="seafood" className="h-screen p-8 bg-blue-200 text-black">
        <h1 className="text-4xl font-bold text-center mb-6">Seafood</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Product name="Grilled Salmon" imageSrc="/images/seafood-1.png" price="22.99" />
          <Product name="Shrimp Pasta" imageSrc="/images/seafood-2.png" price="19.99" />
          <Product name="Sushi Platter" imageSrc="/images/seafood-3.png" price="25.99" />
          <Product name="Lobster Tail" imageSrc="/images/seafood-4.png" price="29.99" />
        </div>
      </section>

      <section id="healthy-food" className="h-screen p-8 bg-amber-200 text-black">
        <h1 className="text-4xl font-bold text-center mb-6">Healthy Food</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Product name="Quinoa Bowl" imageSrc="/images/healthy-1.png" price="14.99" />
          <Product name="Avocado Toast" imageSrc="/images/healthy-2.png" price="12.99" />
          <Product name="Greek Salad" imageSrc="/images/healthy-3.png" price="10.99" />
          <Product name="Fruit Smoothie" imageSrc="/images/healthy-4.png" price="8.99" />
        </div>
      </section>

      <section id="fast-food" className="h-screen p-8 bg-red-200 text-black">
        <h1 className="text-4xl font-bold text-center mb-6">Fast Food</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Product name="Cheeseburger" imageSrc="/images/fastfood-1.png" price="9.99" />
          <Product name="Pepperoni Pizza" imageSrc="/images/fastfood-2.png" price="15.99" />
          <Product name="French Fries" imageSrc="/images/fastfood-3.png" price="5.99" />
          <Product name="Chicken Nuggets" imageSrc="/images/fastfood-4.png" price="7.99" />
        </div>
      </section>

      <section id="desserts" className="h-screen p-8 bg-yellow-200 text-black">
        <h1 className="text-4xl font-bold text-center mb-6">Desserts</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Product name="Chocolate Cake" imageSrc="/images/dessert-1.png" price="6.99" />
          <Product name="Ice Cream Sundae" imageSrc="/images/dessert-2.png" price="4.99" />
          <Product name="Apple Pie" imageSrc="/images/dessert-3.png" price="5.99" />
          <Product name="Brownies" imageSrc="/images/dessert-4.png" price="7.99" />
        </div>
      </section>

      <section id="beverages" className="h-screen p-8 bg-teal-200 text-black">
        <h1 className="text-4xl font-bold text-center mb-6">Beverages</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Product name="Coffee" imageSrc="/images/beverage-1.png" price="3.99" />
          <Product name="Fresh Juice" imageSrc="/images/beverage-2.png" price="4.99" />
          <Product name="Milkshake" imageSrc="/images/beverage-3.png" price="5.99" />
          <Product name="Green Tea" imageSrc="/images/beverage-4.png" price="2.99" />
        </div>
      </section>

      <section id="vegan" className="h-screen p-8 bg-purple-200 text-black">
        <h1 className="text-4xl font-bold text-center mb-6">Vegan Dishes</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Product name="Vegan Burger" imageSrc="/images/vegan-1.png" price="11.99" />
          <Product name="Tofu Stir-fry" imageSrc="/images/vegan-2.png" price="13.99" />
          <Product name="Vegan Pasta" imageSrc="/images/vegan-3.png" price="12.99" />
          <Product name="Stuffed Peppers" imageSrc="/images/vegan-4.png" price="14.99" />
        </div>
      </section>
    </div>
  );
};

export default FoodMenu;