"use client";

// import ProductInfo from "./Info";
// import { useState } from "react";

// Define the structure of the product details that will be passed to `onOpen`
export interface ProductDetailData {
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

export interface ProductProps {
  name: string;
  imageSrc: string;
  price: string;
  label?: string;
  onOpen: (productData: ProductDetailData) => void;
}

export default function Product({ name, imageSrc, price, label, onOpen }: ProductProps) {
  return (
    <div className="relative flex flex-col items-center bg-white shadow-md rounded-xl overflow-hidden w-full max-w-[180px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] transition-transform duration-300 hover:scale-105">
      
      {/* Image Section */}
      <figure className="w-full h-36 sm:h-40 md:h-44 lg:h-48">
        <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
      </figure>

      {/* Product Info */}
      <div className="p-3 sm:p-4 w-full text-center">
        
        {/* Dish Name */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-800">{name}</h3>

        {/* Optional Label */}
        {label && (
          <span className="bg-red-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full mt-1 inline-block">
            {label}
          </span>
        )}

        {/* Price */}
        <p className="text-sm sm:text-base font-bold text-gray-700 mt-1">${price}</p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-2">
          <button
            className="mt-2 sm:mt-3 px-4 sm:px-5 py-1 sm:py-2 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition"
          >
            Order Now
          </button>

          <button
            onClick={() =>
              onOpen({
                name,
                imageSrc,
                price,
                label,
                category: "Fast Food",
                rating: 4.7,
                reviews: 320,
                calories: 850,
                description:
                  "A mouth-watering cheeseburger loaded with fresh ingredients and a juicy beef patty.",
                ingredients: [
                  "Beef Patty",
                  "Cheddar Cheese",
                  "Lettuce",
                  "Tomato",
                  "Pickles",
                  "Onions",
                  "Burger Bun",
                  "Special Sauce",
                ],
              })
            }
            className="mt-2 sm:mt-3 px-4 sm:px-5 py-1 sm:py-2 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition"
          >
            Know more
          </button>
        </div>
      </div>
    </div>
  );
}
