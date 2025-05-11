"use client";

import axios from "axios";
import { ProductInfo } from "./Info";

export interface ProductProps {
  name: string;
  imageSrc: string;
  price: number;
  label?: string;
  onOpen: (productData: ProductInfo) => void;
}

export default function Product({
  name,
  imageSrc,
  price,
  label,
  onOpen,
}: ProductProps) {
  const productData: ProductInfo = {
    name,
    imageSrc,
    price,
    label,
    category: "Fast Food",
    rating: 4.5,
    reviews: 100,
    calories: 500,
    description: "A delicious dish",
    ingredients: [],
  };

  const handleOrderNow = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        name,
        imageSrc,
        price,
        quantity: 1,
      });
      console.log("Item added to cart:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center bg-white shadow-md rounded-xl overflow-hidden w-full max-w-[180px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] transition-transform duration-300 hover:scale-105">
      <figure className="w-full h-36 sm:h-40 md:h-44 lg:h-48">
        <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
      </figure>

      <div className="p-3 sm:p-4 w-full text-center">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800">{name}</h3>
        {label && (
          <span className="bg-red-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full mt-1 inline-block">
            {label}
          </span>
        )}
        <p className="text-sm sm:text-base font-bold text-gray-700 mt-1">${price}</p>

        <div className="flex justify-center gap-2">
          <button
            onClick={handleOrderNow}
            className="mt-2 sm:mt-3 px-4 sm:px-5 py-1 sm:py-2 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition"
          >
            Order Now
          </button>

          <button
            onClick={() => onOpen(productData)}
            className="mt-2 sm:mt-3 px-4 sm:px-5 py-1 sm:py-2 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition"
          >
            Know more
          </button>
        </div>
      </div>
    </div>
  );
}
