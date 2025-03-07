import Header from "@/components/Header";
import Product from "@/components/Product";

export default function Home() {
  return (
    <>
      <Header />  
      <main className="pt-16"> {/* This prevents content from hiding behind the Header */}
        <h2 className="text-xl font-bold">shfjk</h2>
      <Product name="Greek Salad" imageSrc="./favicon.ico" price="25.50" label="Seasonal" />
      <Product name="Pasta Carbonara" imageSrc="./assets/images/menu-2.png" price="18.99" />
      </main>
    </>
  );
}
