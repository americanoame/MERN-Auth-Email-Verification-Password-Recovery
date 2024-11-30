import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);

  

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      {/* Outer container remains static */}
      <motion.div
        initial={{ opacity: 0, y: 90 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {/* Conditional rendering for loading */}
        {isLoading ? (
          <div className="space-y-4">
            {/* Skeleton Loader for the entire form */}
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-12 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 rounded-md animate-pulse intensity-effect"
              />
            ))}
          </div>
        ) : (
          <motion.form
            onSubmit={handleSignUp}
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <FaEnvelope
                  className="text-gray-900 ml-1 opacity-60"
                  size={15}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 p-3 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <FaLock className="text-gray-900 ml-1 opacity-60" size={15} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 p-3 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-2"
                >
                  {showPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 p-3 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-white rounded-md hover:opacity-70 transition-all duration-300"
              
            >
             Sign In
            </button>

            {/* Forgot Password link */}
            <div className="text-center mt-4">
              <Link to="/forgot-password">
                <span className="text-blue-500 cursor-pointer">
                  Forgot Password?
                </span>
              </Link>
            </div>

            <div className="text-center mt-4 ">
              <Link to="/signup">
                Don't have an account?
                <span className="text-blue-500 cursor-pointer ">Sign Up</span>
              </Link>
            </div>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default SignIn;
