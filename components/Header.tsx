"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username] = useState("JohnDoe"); // Replace with actual username from auth

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-9999">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-red-600">
          🍽️ EL-Dine
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-red-500">Home</Link>
            <Link href="/OrderHistory" className="text-gray-700 hover:text-red-500">Order Histroy</Link>
            <Link href="/Test" className="text-gray-700 hover:text-red-500">About</Link>
            <Link href="/Contact" className="text-gray-700 hover:text-red-500">Contact</Link>
            
            {isLogin ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Welcome, {username}</span>
                <button 
                  onClick={() => setIsLogin(false)}
                  className="px-4 py-2 bg-gray-100 text-red-500 rounded-md hover:bg-gray-200 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <Link 
                  href="/Login" 
                  className="px-4 py-2 text-gray-700 hover:text-red-500 transition"
                >
                  Login
                </Link>
                <Link 
                  href="/Login" 
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
        
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Slides from Right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col items-center mt-16 space-y-6 p-4">
          <Link href="/" className="text-lg text-gray-700 hover:text-red-500 w-full text-center" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/OrderHistory" className="text-lg text-gray-700 hover:text-red-500 w-full text-center" onClick={() => setIsOpen(false)}>OrderHistory</Link>
          <Link href="/Test" className="text-lg text-gray-700 hover:text-red-500 w-full text-center" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/Contact" className="text-lg text-gray-700 hover:text-red-500 w-full text-center" onClick={() => setIsOpen(false)}>Contact</Link>
          
          {isLogin ? (
            <div className="w-full flex flex-col gap-4 items-center">
              <span className="text-gray-700">Welcome, {username}</span>
              <button 
                onClick={() => {
                  setIsLogin(false);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 bg-gray-100 text-red-500 rounded-md hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4 items-center">
              <Link 
                href="Login" 
                className="w-full text-center px-4 py-2 text-gray-700 hover:text-red-500 transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/Login" 
                className="w-full text-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
          
        
        </nav>
      </div>
    </header>
  );
}