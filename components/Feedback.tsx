"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

// Define types
interface Feedback {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Fetch existing feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/feedback/all");
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  // Submit feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/feedback", {
        name,
        email,
        message,
      });
      alert("Feedback submitted!");

      // Optionally fetch updated list
      setFeedbacks((prev) => [...prev, res.data.feedback]);

      // Clear form
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 p-6">
      {/* Feedback Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-100 p-4 rounded-xl shadow"
      >
        <h2 className="text-xl font-semibold">Submit Feedback</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Feedback
        </button>
      </form>

      {/* Feedback List */}
      <div>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-500">No feedbacks available</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {feedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <p className="text-sm text-gray-500">
                  {new Date(feedback.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-700">{feedback.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {feedback.name} | {feedback.email}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
