import React, { useState } from "react";
import axios from "axios"; // Import AxiosError
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      console.log(res.data);

      // Save the token locally (example: localStorage)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      router.push("/"); // redirect to homepage or dashboard
    } catch (error) {
      // Cast error to AxiosError
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data.message || "Login failed");
        console.log(error.response?.data.message);
      } else {
        setErrorMsg("An unexpected error occurred");
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-600 bg-opacity-10">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md border border-green-600">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Login
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
          >
            Sign In
          </button>

          {errorMsg && (
            <p className="text-center text-sm text-red-600 mt-2">{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
}
