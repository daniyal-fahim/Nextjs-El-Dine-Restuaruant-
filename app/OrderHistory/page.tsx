'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Header from '@/components/Header';
import { Loader2, AlertCircle } from 'lucide-react';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
}

interface OrderItem {
  menuItemId: MenuItem;  // Now `menuItemId` is of type `MenuItem` instead of just an ID
  quantity: number;
}

interface Order {
  _id: string;
  userId?: { name: string; email: string };
  items: OrderItem[];  // `items` is an array of `OrderItem` which contains `MenuItem` objects
  total: number;
  status: string;
  createdAt: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<Order[]>('http://localhost:5000/api/orders/history', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          axiosError.response?.status === 401
            ? 'Unauthorized access'
            : 'Failed to fetch order history'
        );
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 flex items-center">
          <AlertCircle className="w-6 h-6 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-100">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Order History</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Order #{order._id.slice(-6)}
                </h2>
                {order.userId && (
                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-medium">Customer:</span> {order.userId.name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {order.userId.email}
                    </p>
                  </div>
                )}
               <div className="mb-4">
  <h3 className="text-lg font-medium text-gray-700">Items</h3>
  <ul className="list-disc pl-5">
    {order.items.map((item, index) => {
      const name = item.menuItemId?.name || item.name;
      const price = item.menuItemId?.price ?? item.price;

      return (
        <li key={index} className="text-gray-600">
          {name && price != null ? (
            <>
              {name} - ${price} x {item.quantity}
            </>
          ) : (
            <span>Item details not available</span>
          )}
        </li>
      );
    })}
  </ul>
</div>


                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Total:</span> ${order.total}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`${
                      order.status === 'Delivered'
                        ? 'text-green-600'
                        : order.status === 'In Transit'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    } font-semibold`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
