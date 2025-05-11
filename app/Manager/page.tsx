'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Product = {
  _id: string;
  name: string;
};

type Feedback = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type Order = {
  _id: string;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};

export default function ManagerPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [feedbackRes, productRes, orderRes] = await Promise.all([
          axios.get('http://localhost:5000/api/feedback/all'),
          axios.get('http://localhost:5000/api/menu'),
          axios.get('http://localhost:5000/api/orders/history'), // Fetch all orders
        ]);
        setFeedbacks(feedbackRes.data);
        setProducts(productRes.data);

        // Filter and set only pending orders
       // const pendingOrders = orderRes.data.filter((order: Order) => order.status === 'pending');
        setOrders(orderRes.data);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        if (err.response) {
          setError(`Error ${err.response.status}: ${err.response.data.message || err.response.statusText}`);
        } else {
          setError('Network or server error, please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle approving an order
  const approveOrder = async (orderId: string) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/orders/${orderId}/approve`);
      if (res.status === 200) {
        // Remove the approved order from the list
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      }
    } catch (err) {
      console.error('Error approving order:', err);
    }
  };

  // Function to handle canceling an order
  const cancelOrder = async (orderId: string) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/orders/${orderId}/cancel`);
      if (res.status === 200) {
        // Remove the canceled order from the list
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      }
    } catch (err) {
      console.error('Error canceling order:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-900 mb-6">Manager Dashboard</h1>

      {loading ? (
        <p className="text-gray-700">Loading data...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <main className="space-y-10">
          {/* Feedback Section */}
          <section>
            <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Customer Feedback</h2>
            {feedbacks.length === 0 ? (
              <p className="text-gray-600">No feedback available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feedbacks.map((feedback) => (
                  <div
                    key={feedback._id}
                    className="bg-white rounded-xl p-4 border border-yellow-300 hover:shadow-lg transition"
                  >
                    <p className="text-green-900 font-semibold">Name: {feedback.name}</p>
                    <p className="text-blue-800">Email: {feedback.email}</p>
                    <p className="text-gray-700 mt-1">Message: {feedback.message}</p>
                    <p className="text-sm text-gray-500 mt-2">Date: {new Date(feedback.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Product Section */}
          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Menu Items Currently Available:
            </h2>
            {products.length === 0 ? (
              <p className="text-gray-600">No products available.</p>
            ) : (
              <ol className="list-decimal pl-6 text-gray-700">
                {products.map((product) => (
                  <li key={product._id}>{product.name}</li>
                ))}
              </ol>
            )}
          </section>

          {/* Orders Section */}
          <section>
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">Pending Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">No pending orders.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-xl p-4 border border-purple-300 hover:shadow-lg transition"
                  >
                    <p className="text-lg font-bold text-gray-800">Customer: {order.customerName}</p>
                    <p className="text-gray-700">Total: ${order.totalAmount}</p>
                    <p className="text-gray-700">Status: {order.status}</p>
                    <p className="text-gray-600 text-sm">Ordered on: {new Date(order.createdAt).toLocaleString()}</p>

                    {/* Approve/Cancel buttons */}
                    <div className="mt-4 flex space-x-4">
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                        onClick={() => approveOrder(order._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                        onClick={() => cancelOrder(order._id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      )}
    </div>
  );
}
