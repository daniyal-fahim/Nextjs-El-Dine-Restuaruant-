interface ProductProps {
    name: string;
    imageSrc: string;
    price: string;
    label?: string; 
  }
  
  export default function Product({ name, imageSrc, price, label }: ProductProps) {
    return (
      <div className="relative h-[300px] w-[300px] m-1 p-10 border-4 border-red-600 hover:h-[400px] hover:w-[400px] hover:border-green-300 hover:bg-red-600 transition-all duration-300">
        <div className="menu-card hover:card">
  
          {/* Image Section */}
          <figure className="card-banner img-holder">
            <img src={imageSrc} width="100" height="100" loading="lazy" alt={name} className="img-cover" />
          </figure>
  
          {/* Product Info */}
          <div>
            <div className="title-wrapper">
              <h3 className="title-3">
                <a href="#" className="card-title">{name}</a>
              </h3>
  
              {/* Optional Label */}
              {label && <span className="badge label-1">{label}</span>}
  
              <span className="span title-2">${price}</span>
            </div>
          </div>
  
        </div>
      </div>
    );
  }
  