"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

// Define types
interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch feedbacks from backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback");
        setFeedbacks(response.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No feedbacks available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg"
            >
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-500 text-sm">
                    Feedback #{feedback.id}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(feedback.createdAt).toLocaleString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-green-900">
                  {feedback.name}
                </h3>
                <p className="text-gray-600 text-sm">{feedback.email}</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-gray-600">{feedback.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}