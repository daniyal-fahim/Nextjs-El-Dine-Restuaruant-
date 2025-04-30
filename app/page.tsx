import Header from "@/components/Header";
//import Slider from "@/components/Slider";
import Cart from "@/components/Cart";
import Menu from "@/components/Menu";
export default function Home() {
  return (
    <>
      <Header />  
      <main className="pt-16"> {/* This prevents content from hiding behind the Header */}
        
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <Product name="Pasta Carbonara" imageSrc="/images/menu-2.png" price="18.99" />
      <Product name="Margherita Pizza" imageSrc="/images/menu-3.png" price="14.99" />
      <Product name="Tiramisu" imageSrc="/images/menu-4.png" price="9.99" label="Seasonal" />
      <Product name="Lasagna" imageSrc="/images/menu-5.png" price="16.50" />
    </div> */}


    {/* <ProductInfo name="Tiramisu" imageSrc="/images/menu-4.png" price="9.99" label="Seasonal" />
  <ProductInfo
  
  name="Deluxe Cheeseburger"
  imageSrc="/images/menu-4.png"
  price="12.99"
  label="Best Seller"
  category="Fast Food"
  rating={4.7}
  reviews={320}
  calories={850}
  description="A mouth-watering cheeseburger loaded with fresh ingredients and a juicy beef patty."
  ingredients={[
    "Beef Patty",
    "Cheddar Cheese",
    "Lettuce",
    "Tomato",
    "Pickles",
    "Onions",
    "Burger Bun",
    "Special Sauce"
  ]}
/> */}
<Cart/>
      <Menu />

      </main>
      {/*<Slider/>
      */}
    </>
  );
}
