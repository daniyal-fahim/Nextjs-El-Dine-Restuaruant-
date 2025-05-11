"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import Header from "@/components/Header";

// Interfaces for type safety
interface TeamMember {
  name: string;
  role: string;
  id?: string;
  email?: string;
  image: string;
  alt: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

// Data for developers and chefs
const developers: TeamMember[] = [
  {
    name: "Daniyal Fahim",
    role: "Lead Developer (22K-4282)",
    email: "daniyal@eldine.com",
    image: "/images/dev1.jpg",
    alt: "Developer 1",
  },
  {
    name: "Dawood Adnan",
    role: "Frontend Developer (22K-4663)",
    email: "dawood@eldine.com",
    image: "/images/dev2.jpg",
    alt: "Developer 2",
  },
  {
    name: "Daiyan Ur Rehman",
    role: "Backend Developer (22K-4167)",
    email: "daiyan@eldine.com",
    image: "/images/dev3.jpg",
    alt: "Developer 3",
  },
];

const chefs: TeamMember[] = [
  {
    name: "Chef John Doe",
    role: "Head Chef",
    image: "/images/chef.jpg",
    alt: "Chef",
  },
  {
    name: "Lisa Wong",
    role: "Sous Chef",
    image: "/images/souschef.jpg",
    alt: "Sous Chef",
  },
  {
    name: "Maria Garcia",
    role: "Pastry Chef",
    image: "/images/pastrychef.jpg",
    alt: "Pastry Chef",
  },
];

// Reusable Team Member Card component
const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="bg-white p-6 shadow-lg rounded-lg">
    <Image
      src={member.image}
      alt={member.alt}
      width={500}
      height={350}
      className="w-full h-56 object-cover rounded-t-lg"
    />
    <h3 className="text-xl font-semibold text-gray-800 mt-4">{member.name}</h3>
    <p className="text-gray-600">{member.role}</p>
    {member.email && (
      <p className="text-gray-600 text-sm mt-2">Email: {member.email}</p>
    )}
  </div>
);

// Page Header component
const PageHeader: React.FC = () => (
  <header className="bg-green-600 text-white py-6 text-center mb-12">
    <h1 className="text-4xl font-bold">Contact Us</h1>
    <p className="text-lg mt-2">
      We&apos;d love to hear from you! Reach out with any questions or feedback.
    </p>
  </header>
);

// Team Section component
const TeamSection: React.FC<{ title: string; members: TeamMember[] }> = ({
  title,
  members,
}) => (
  <section className="text-center mb-16">
    <h2 className="text-3xl font-semibold text-red-600 mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <TeamMemberCard key={index} member={member} />
      ))}
    </div>
  </section>
);

// Contact Form component
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Feedback sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send feedback. Please try again.");
      }
    } catch {
      setStatus("An error occurred. Please try again later.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="text-center">
      <h2 className="text-3xl font-semibold text-red-600 mb-4">
        Send Us Your Feedback
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white text-black p-8 shadow-lg rounded-lg"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 font-semibold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            rows={5}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Submit
        </button>
        {status && (
          <p
            className={`mt-4 text-center ${
              status.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </section>
  );
};

// Main Contact Page component
export default function Contact() {
  return (
    <div className="bg-gray-50 font-sans">
      <Header />
      <main className="pt-28 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <PageHeader />
          <TeamSection title="Meet Our Developers" members={developers} />
          <TeamSection title="Our Culinary Team" members={chefs} />
          <ContactForm />
        </div>
      </main>
      <footer className="bg-green-600 text-white py-6 text-center">
        <p>© 2025 Eldine Restaurant. All rights reserved.</p>
      </footer>
    </div>
  );
}
