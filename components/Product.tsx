interface ProductProps {
  name: string;
  imageSrc: string;
  price: string;
  label?: string;
}

export default function Product({ name, imageSrc, price, label }: ProductProps) {
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

        {/* Order Button */}
        <button className="mt-2 sm:mt-3 px-4 sm:px-5 py-1 sm:py-2 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition">
          Order Now
        </button>
      </div>
    </div>
  );
}
