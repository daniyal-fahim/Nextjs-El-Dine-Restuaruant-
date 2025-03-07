import Header from "@/components/Header";
import Product from "@/components/Product";

export default function Home() {
  return (
    <>
      <Header />  
      <main className="pt-16"> {/* This prevents content from hiding behind the Header */}
        
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <Product name="Pasta Carbonara" imageSrc="/images/menu-2.png" price="18.99" />
      <Product name="Margherita Pizza" imageSrc="/images/menu-3.png" price="14.99" />
      <Product name="Tiramisu" imageSrc="/images/menu-4.png" price="9.99" label="Seasonal" />
      <Product name="Lasagna" imageSrc="/images/menu-5.png" price="16.50" />
    </div>

      </main>
    </>
  );
}
