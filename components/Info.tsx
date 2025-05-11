"use client";

interface ProductProps {
  name: string;
  imageSrc: string;
  price: number;
  label?: string;
  ingredients?: string[];
  rating?: number;
  calories?: number;
  reviews?: number;
  category?: string;
  description?: string;
  onClose: () => void; // Close function
}
export interface ProductInfo {
  name: string;
  imageSrc: string;
  price: number;
  label?: string;
  ingredients?: string[];
  rating?: number;
  calories?: number;
  reviews?: number;
  category?: string;
  description?: string;
}
export default function ProductInfo({ name, imageSrc, price, label, ingredients, rating, calories, reviews, category, description, onClose }: ProductProps) {
  return (
    <div className="pt-56 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl">
          ✖
        </button>

        {/* Left Side - Image */}
        <div className="flex items-center justify-center">
          <img src={imageSrc} alt={name} className="max-w-full max-h-[500px] object-contain rounded-lg" />
        </div>

        {/* Right Side - Product Details */}
        <div className="flex flex-col justify-center text-left">
          <h2 className="text-2xl md:text-3xl font-semibold">{name}</h2>
          {label && <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full mt-2 inline-block">{label}</span>}
          <p className="text-lg font-bold text-gray-700 mt-2">${price}</p>

          {/* Category */}
          {category && <p className="text-gray-600 mt-1"><strong>Category:</strong> {category}</p>}

          {/* Rating Section */}
          {rating && (
            <div className="flex items-center mt-3">
              <span className="text-yellow-500 text-xl">⭐</span>
              <span className="ml-2 text-gray-700">{rating} / 5 ({reviews} Reviews)</span>
            </div>
          )}

          {/* Description */}
          {description && <p className="text-gray-600 mt-2">{description}</p>}

          {/* Calories */}
          {calories && <p className="text-gray-600 mt-2"><strong>Calories:</strong> {calories} kcal</p>}

          {/* Ingredients Section */}
          {ingredients && ingredients.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Ingredients:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
