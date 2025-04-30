"use client";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import ProductInfo from "./Info";
import axios from "axios";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CategoryType {
  id: string;
  label: string;
  items: MenuItem[];
}

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const handleOpen = (item: MenuItem) => {
    setSelected(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelected(null);
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get<MenuItem[]>(
          "http://localhost:5000/api/menu"
        );
        const items = res.data;
        const map: Record<string, CategoryType> = {};
        items.forEach((item) => {
          if (!map[item.category]) {
            map[item.category] = {
              id: item.category,
              label: item.category,
              items: [],
            };
          }
          map[item.category].items.push(item);
        });
        setCategories(Object.values(map));
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div>
      {isOpen && selected && (
        <ProductInfo
          name={selected.name}
          imageSrc={selected.image}
          price={selected.price.toFixed(2)}
          category={selected.category}
          description={selected.description}
          onClose={handleClose}
        />
      )}

      <nav className="sticky top-16 bg-gray-900 text-white z-50">
        <ul className="flex gap-2 p-3 justify-center">
          {categories.map(({ id, label }) => (
            <li key={id} className="bg-red-600 px-3 py-2 rounded text-sm">
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {categories.map(({ id, label, items }) => (
        <section key={id} id={id} className="p-8 bg-gray-100 mb-8">
          <h2 className="text-3xl font-bold text-center mb-6">{label}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <Product
                key={item._id}
                name={item.name}
                imageSrc={item.image}
                price={item.price.toFixed(2)}
                label="Popular"
                onOpen={() => handleOpen(item)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Menu;
