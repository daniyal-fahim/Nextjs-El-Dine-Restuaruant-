"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductInfo from "@/components/Info";
import AddProduct from "@/components/AddProduct";
import axios from "axios";
import { CheckCircleIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

// Define types
interface Product {
  _id: string;
  name: string;
  imageSrc: string;
  price: string;
  category: string;
  description?: string;
  label?: string;
  rating?: number;
  reviews?: number;
  calories?: number;
  ingredients?: string[];
}

interface Order {
  id: string;
  products: { id: string; name: string; quantity: number }[];
  address: string;
  total: number;
  status: string;
}

export default function Manager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductInfoOpen, setIsProductInfoOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch orders and products from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders
        const ordersRes = await axios.get("http://localhost:5000/api/orders");
        setOrders(ordersRes.data);

        // Fetch products (menu items)
        const productsRes = await axios.get("http://localhost:5000/api/menu");
        setProducts(productsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle product info modal
  const handleOpenProductInfo = (product: Product) => {
    setSelectedProduct(product);
    setIsProductInfoOpen(true);
  };

  const handleCloseProductInfo = () => {
    setIsProductInfoOpen(false);
    setSelectedProduct(null);
  };

  // Toggle Add Product form
  const toggleAddProduct = () => {
    setIsAddProductOpen(!isAddProductOpen);
  };

  // Approve order
  const approveOrder = async (orderId: string) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: "In Transit" });
      const ordersRes = await axios.get("http://localhost:5000/api/orders");
      setOrders(ordersRes.data);
      alert("✅ Order approved!");
    } catch (err) {
      console.error("Error approving order:", err);
      alert("❌ Failed to approve order.");
    }
  };

  // Delete product
  const deleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter((p) => p._id !== productId));
      alert("✅ Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("❌ Failed to delete product.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Header />

      {/* Product Info Modal */}
      {isProductInfoOpen && selectedProduct && (
        <ProductInfo
          name={selectedProduct.name}
          imageSrc={selectedProduct.imageSrc}
          price={selectedProduct.price}
          category={selectedProduct.category}
          description={selectedProduct.description || "No description available"}
          label={selectedProduct.label || "Standard"}
          rating={selectedProduct.rating || 4.5}
          reviews={selectedProduct.reviews || 100}
          calories={selectedProduct.calories || 500}
          ingredients={selectedProduct.ingredients || []}
          onClose={handleCloseProductInfo}
        />
      )}

      <main className="pt-20 p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-bold text-green-900">Manager Dashboard</h1>
        </div>

        {/* Add Product Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleAddProduct}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <PlusCircleIcon className="h-6 w-6" />
            <span>{isAddProductOpen ? "Close Form" : "Add New Product"}</span>
          </button>
        </div>

        {/* Add Product Form */}
        {isAddProductOpen && (
          <div className="mb-8">
            <AddProduct />
          </div>
        )}

        {/* Orders Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-900 mb-4">Pending Orders</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-500">No pending orders</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders
                .filter((order) => order.status === "Pending")
                .map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              order.status === "Pending"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
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
                          Includes {order.products.map((p) => p.name).join(", ")}
                        </p>
                      </div>
                      <button
                        onClick={() => approveOrder(order.id)}
                        className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircleIcon className="h-6 w-6" />
                        <span className="font-semibold">Approve Order</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-2xl font-semibold text-green-900 mb-4">Menu Items</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">No products available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
                >
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <p className="text-gray-600 text-sm">{product.category}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleOpenProductInfo(product)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}