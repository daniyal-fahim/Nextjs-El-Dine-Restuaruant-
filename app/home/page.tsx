import Header from "@/components/Header";
import Product from "@/components/Product";
import Slider from "@/components/Slider";
import ProductInfo from "@/components/Info";

export default function home(){

    return(<>
    <Header/>

    <div className="border-amber-300">
        <h1>Top Picks For you</h1>
        <Product/>
    </div>

    <div className="border-amber-300">
        <h1>Promotional</h1>
        <Product/>
    </div>

    <div className="border-amber-300">
        <h1>Top Picks For you</h1>
        <Product/>
    </div>

    <div className="border-amber-300">
        <h1>Top Picks For you</h1>
        <Product/>
    </div>
    </>);
}