"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-9999">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-red-600">
          🍽️ EL-Dine
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-red-500">Home</Link>
          <Link href="/menu" className="text-gray-700 hover:text-red-500">Menu</Link>
          <Link href="/about" className="text-gray-700 hover:text-red-500">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-red-500">Contact</Link>
          <Link href="/reservation" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Book a Table
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Slides from Right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
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
        <nav className="flex flex-col items-center mt-16 space-y-6">
          <Link href="/" className="text-lg text-gray-700 hover:text-red-500" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/menu" className="text-lg text-gray-700 hover:text-red-500" onClick={() => setIsOpen(false)}>Menu</Link>
          <Link href="/about" className="text-lg text-gray-700 hover:text-red-500" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" className="text-lg text-gray-700 hover:text-red-500" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/reservation" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => setIsOpen(false)}>
            Book a Table
          </Link>
        </nav>
      </div>
    </header>
  );
}
