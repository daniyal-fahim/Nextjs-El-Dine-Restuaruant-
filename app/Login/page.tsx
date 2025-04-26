"use client"
import { useState } from "react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
    <button
        onClick={toggleForm}
        className="mt-4 w-50 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
      >
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
      </button>
      {isLogin ? <Login /> : <Signup />}
      
    </>
  );
}
