"use client";

import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <div className="bg-gray-50 font-sans pt-28">
      <header className="bg-green-600 text-white py-6 text-center">
        <h1 className="text-4xl font-bold">Welcome to Eldine</h1>
        <p className="text-lg mt-2">The best dining experience, just for you!</p>
      </header>

      <main className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <section className="text-center">
            <h2 className="text-3xl font-semibold text-red-600 mb-4">About Us</h2>
            <p className="text-lg text-gray-700 mb-8">
              At Eldine, we believe in providing our guests with the finest dining experience possible.
              Our chefs use only the freshest ingredients, ensuring every dish is crafted with care and passion.
              Whether you&apos;re here for a casual meal with friends or a special celebration, we guarantee you&apos;ll leave with a smile.
            </p>

            <div className="flex flex-col md:flex-row justify-around items-center">
              <div className="mb-8 md:mb-0">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-600">
                  To provide an unforgettable culinary journey that combines rich flavors, exceptional service, and a warm, welcoming atmosphere.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-600 mb-4">Our Vision</h3>
                <p className="text-lg text-gray-600">
                  To become the go-to destination for food lovers, offering a unique blend of traditional recipes and modern twists.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16 text-center">
            <h2 className="text-3xl font-semibold text-red-600 mb-4">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 shadow-lg rounded-lg">
                <Image
                  src="/images/chef.jpg"
                  alt="Chef"
                  width={500}
                  height={350}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">Chef John Doe</h3>
                <p className="text-gray-600">Head Chef</p>
              </div>
              <div className="bg-white p-6 shadow-lg rounded-lg">
                <Image
                  src="/images/manager.jpg"
                  alt="Manager"
                  width={500}
                  height={350}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">Sarah Smith</h3>
                <p className="text-gray-600">Restaurant Manager</p>
              </div>
              <div className="bg-white p-6 shadow-lg rounded-lg">
                <Image
                  src="/images/waiter.jpg"
                  alt="Waiter"
                  width={500}
                  height={350}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">Alex Brown</h3>
                <p className="text-gray-600">Senior Waiter</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-green-600 text-white py-6 text-center">
        <p>&copy; 2025 Eldine Restaurant. All rights reserved.</p>
      </footer>
    </div>
  );
}
