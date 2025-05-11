import React, { useState } from "react";
import axios from "axios";

interface Product {
    name: string;
    description: string;
    price: number | string;
    category: string;
    image: string;
}

const AddProduct: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: name === "price" ? parseFloat(value) || "" : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/menu/add", product);
            alert("✅ Product added successfully!");
            console.log(response.data);
            setProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                image: "",
            });
        } catch (error) {
            console.error("Error adding product:", error);
            alert("❌ Failed to add product.");
        }
    };

    const handleReset = () => {
        setProduct({
            name: "",
            description: "",
            price: "",
            category: "",
            image: "",
        });
    };

    return (
        <div className="min-h-screen text-black bg-white flex items-center justify-center p-6 pt-28">
            <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Add New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Product Name</label>
                        <input
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600  placeholder-gray-500"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            step="0.01"
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Category</label>
                        <input
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Image URL</label>
                        <input
                            name="image"
                            value={product.image}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-500"
                            required
                        />
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                        >
                            Add Product
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
