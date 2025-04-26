"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Product from "./Product";
import ProductInfo from "./Info";

interface ProductType {
  name: string;
  imageSrc: string;
  price: string;
  label?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  calories?: number;
  description?: string;
  ingredients?: string[];
}

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);

  const handleOpen = (productData: ProductType) => {
    setProduct(productData);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setProduct(null);
  };

  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const targetId = target.getAttribute("href")?.substring(1);
      const targetElement = targetId ? document.getElementById(targetId) : null;
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - 60, behavior: "smooth" });
      }
    };

    const links = document.querySelectorAll("a[href^='#']");
    links.forEach((link) => link.addEventListener("click", handleScroll));

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleScroll));
    };
  }, []);

  const categories = [
    { id: "seafood", label: "Seafood", bg: "bg-blue-200", items: [
      { name: "Grilled Salmon", imageSrc: "/images/seafood-1.png", price: "22.99" },
      { name: "Shrimp Pasta", imageSrc: "/images/seafood-2.png", price: "19.99" },
      { name: "Sushi Platter", imageSrc: "/images/seafood-3.png", price: "25.99" },
      { name: "Lobster Tail", imageSrc: "/images/seafood-4.png", price: "29.99" },
    ]},
    { id: "healthy-food", label: "Healthy Food", bg: "bg-amber-200", items: [
      { name: "Quinoa Bowl", imageSrc: "/images/healthy-1.png", price: "14.99" },
      { name: "Avocado Toast", imageSrc: "/images/healthy-2.png", price: "12.99" },
      { name: "Greek Salad", imageSrc: "/images/healthy-3.png", price: "10.99" },
      { name: "Fruit Smoothie", imageSrc: "/images/healthy-4.png", price: "8.99" },
    ]},
    { id: "fast-food", label: "Fast Food", bg: "bg-red-200", items: [
      { name: "Cheeseburger", imageSrc: "/images/fastfood-1.png", price: "9.99" },
      { name: "Pepperoni Pizza", imageSrc: "/images/fastfood-2.png", price: "15.99" },
      { name: "French Fries", imageSrc: "/images/fastfood-3.png", price: "5.99" },
      { name: "Chicken Nuggets", imageSrc: "/images/fastfood-4.png", price: "7.99" },
    ]},
    { id: "desserts", label: "Desserts", bg: "bg-yellow-200", items: [
      { name: "Chocolate Cake", imageSrc: "/images/dessert-1.png", price: "6.99" },
      { name: "Ice Cream Sundae", imageSrc: "/images/dessert-2.png", price: "4.99" },
      { name: "Apple Pie", imageSrc: "/images/dessert-3.png", price: "5.99" },
      { name: "Brownies", imageSrc: "/images/dessert-4.png", price: "7.99" },
    ]},
    { id: "beverages", label: "Beverages", bg: "bg-teal-200", items: [
      { name: "Coffee", imageSrc: "/images/beverage-1.png", price: "3.99" },
      { name: "Fresh Juice", imageSrc: "/images/beverage-2.png", price: "4.99" },
      { name: "Iced Tea", imageSrc: "/images/beverage-3.png", price: "3.49" },
      { name: "Smoothie", imageSrc: "/images/beverage-4.png", price: "5.99" },
    ]},
    { id: "vegan-dishes", label: "Vegan Dishes", bg: "bg-green-200", items: [
      { name: "Vegan Burger", imageSrc: "/images/vegan-1.png", price: "11.99" },
      { name: "Tofu Stir Fry", imageSrc: "/images/vegan-2.png", price: "13.99" },
      { name: "Vegan Pasta", imageSrc: "/images/vegan-3.png", price: "14.49" },
      { name: "Chickpea Salad", imageSrc: "/images/vegan-4.png", price: "9.99" },
    ]},
  ];

  return (
    <div>
      {isOpen && product && <ProductInfo {...product} onClose={handleClose} />}

      {/* Navbar */}
      <nav className="sticky top-16 left-0 w-full bg-gray-900 text-white shadow-md z-50">
        <ul className="flex flex-wrap justify-center gap-2 px-4 py-3">
          {categories.map(({ label, id }) => (
            <li key={id} className="bg-red-600 px-3 py-2 rounded text-sm">
              <Link href={`#${id}`}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sections */}
      {categories.map(({ id, label, items, bg }) => (
        <section key={id} id={id} className={`h-screen p-8 ${bg} text-black`}>
          <h1 className="text-4xl font-bold text-center mb-6">{label}</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <Product
                key={index}
                {...item}
                onOpen={() => handleOpen({ ...item, category: label })}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Menu;
