"use client";
import Header from "@/components/Header";
import ProductInfo from "@/components/Info";
// import Cart from "@/components/Cart";
import React, { useState } from "react";
import { CheckCircleIcon, TruckIcon } from "@heroicons/react/24/outline";
// Define Product type
type Product = {
    id: number;
    name: string;
    quantity?: number;
    imageSrc?: string;
    price?: number | string;
    label?: string;
    category?: string;
    rating?: number;
    reviews?: number;
    calories?: number;
    description?: string;
    ingredients?: string[];
};

export default function Rider() {
    const [orders] = useState([
        {
            id: 100,
            products: [
                { id: 200, name: "Burger Meal", quantity: 2 },
                { id: 201, name: "Fries", quantity: 1 }
            ],
            address: "123 Green Valley Road",
            total: 45.99,
            status: "Pending"
        },
        {
            id: 101,
            products: [
                { id: 202, name: "Pizza", quantity: 1 }
            ],
            address: "456 Redwood Avenue",
            total: 22.50,
            status: "In Transit"
        }
    ]);

    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);

    // const handleOpen = (product: Product) => {
    //     setProduct(product);
    //     setIsOpen(true);
    // };

    const handleClose = () => {
        setIsOpen(false);
        setProduct(null);
    };

    const approveOrder = (orderId: number) => {
        // Add approval logic here
        console.log("Approved order:", orderId);
    };

    return (
        <div className="min-h-screen bg-green-50">
            <Header />
            {isOpen && (
                <ProductInfo
                    name={product?.name || "Deluxe Cheeseburger"}
                    imageSrc={product?.imageSrc || "/images/menu-4.png"}
                    price={String(product?.price ?? "12.99")}
                    label={product?.label || "Best Seller"}
                    category={product?.category || "Fast Food"}
                    rating={product?.rating || 4.7}
                    reviews={product?.reviews || 320}
                    calories={product?.calories || 850}
                    description={
                        product?.description ||
                        "A mouth-watering cheeseburger loaded with fresh ingredients and a juicy beef patty."
                    }
                    ingredients={
                        product?.ingredients || [
                            "Beef Patty",
                            "Cheddar Cheese",
                            "Lettuce",
                            "Tomato",
                            "Pickles",
                            "Onions",
                            "Burger Bun",
                            "Special Sauce"
                        ]
                    }
                    onClose={handleClose}
                />
            )}

            <main className="pt-20 p-6 max-w-6xl mx-auto">
                <div className="flex justify-center p-5 bg-red-600 caret-amber-300">
                    <a href='/AddProduct'>Add ProducT</a>
                </div>
                <div className="flex items-center gap-3 mb-8">
                    <TruckIcon className="h-8 w-8 text-red-600" />
                    <h1 className="text-3xl font-bold text-green-900">Rider Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Pending' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {order.status}
                                        </span>
                                        <span className="text-gray-500 text-sm">Order #{order.id}</span>
                                    </div>
                                    <h2 className="text-lg font-semibold text-green-900 mb-2">
                                        Delivery Address
                                    </h2>
                                    <p className="text-gray-600">{order.address}</p>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="mb-4">
                                    <h3 className="text-green-900 font-semibold text-lg">
                                        {order.products.length} Items • ${order.total.toFixed(2)}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Includes {order.products.map(p => p.name).join(', ')}
                                    </p>
                                </div>

                                {order.status === 'Pending' && (
                                    <button
                                        onClick={() => approveOrder(order.id)}
                                        className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <CheckCircleIcon className="h-6 w-6" />
                                        <span className="font-semibold">Approve Order</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
