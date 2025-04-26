"use client";
import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-600 bg-opacity-10">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md border border-green-600">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Login
        </h1>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-red-600 mt-2">
            {/* Placeholder error message */}
            Invalid credentials. Please try again.
          </p>
        </form>
      </div>
    </div>
  );
}
