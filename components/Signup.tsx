"use client";
import React, { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from redirecting

    try {
      // Make an API call to your backend for signup
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If signup successful, show success message
        setSuccessMessage("User successfully registered! You can log in now.");
        setErrorMessage(""); // Clear error if any
      } else {
        // If error, show error message
        setErrorMessage(data.message || "Something went wrong!");
        setSuccessMessage(""); // Clear success message if error occurs
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("Error occurred. Please try again.");
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-600 bg-opacity-10">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md border border-green-600">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">SignUp</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
          >
            Sign Up
          </button>

          {/* Success Message */}
          {successMessage && (
            <p className="text-center text-sm text-green-600 mt-2">{successMessage}</p>
          )}

          {/* Error Message */}
          {errorMessage && (
            <p className="text-center text-sm text-red-600 mt-2">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
