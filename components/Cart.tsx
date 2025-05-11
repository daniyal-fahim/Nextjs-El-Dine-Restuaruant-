"use client";

import React, { useEffect, useState } from "react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type CartItem = {
  _id: string;
  name: string;
  imageSrc: string;
  price: string;
  quantity: number;
};

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart");
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const total = cartItems.reduce(
  (sum, item) => sum + (isNaN(parseFloat(item.price)) ? 0 : parseFloat(item.price)) * item.quantity,
  0
);


  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      const res = await fetch("http://localhost:5000/api/cart");
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
      });
      const res = await fetch("http://localhost:5000/api/cart");
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsPlacingOrder(true);
    try {
      const orderPayload = {
        customerName: "Anonymous", // Or fetch from user context/session
        items: cartItems.map((item) => ({
          menuItemId: item._id,
          name: item.name,
          price: parseFloat(item.price),
          quantity: item.quantity,
        })),
        total: total,
      };

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) throw new Error("Failed to place order");

      alert("Order placed successfully!");
      setCartItems([]); // Clear cart on success
      setIsOpen(false);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong while placing the order.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="relative z-[2147483647]">
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition-all flex items-center gap-2"
      >
        <span className="text-lg">🛒</span>
        <span className="font-semibold">
          View Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-sm z-[2147483647]">
          <div className="flex justify-end min-h-full">
            <div className="w-full max-w-md bg-white shadow-xl h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                  ) : cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">Your cart is empty</p>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item._id} className="flex gap-4 items-center border-b pb-4">
                        <Image
                          src={item.imageSrc}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-green-600 font-medium">${item.price}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="text-gray-600 hover:text-green-600"
                              >
                                -
                              </button>
                              <span className="font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="text-gray-600 hover:text-green-600"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item._id)}
                              className="text-red-600 hover:text-red-700 flex items-center gap-1"
                            >
                              <TrashIcon className="h-5 w-5" />
                              <span className="text-sm">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cartItems.length > 0 && !loading && (
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-bold text-gray-800">Total:</span>
                      <span className="text-xl font-bold text-green-600">${total.toFixed(2)}</span>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors font-semibold"
                        disabled={isPlacingOrder}
                      >
                        {isPlacingOrder ? "Placing Order..." : "Checkout Now"}
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg transition-colors font-semibold"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
