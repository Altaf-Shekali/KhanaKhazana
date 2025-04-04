import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login({ isOpen, onClose, onLoginSuccess }) {
  const navigate = useNavigate();
  const [isKitchenLogin, setIsKitchenLogin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const endpoint = isKitchenLogin 
        ? "http://localhost:4100/kitchen/login"
        : "http://localhost:4100/user/login";

      const response = await axios.post(endpoint, {
        email: data.email,
        password: data.password
      });

      if (response.data) {
        const key = isKitchenLogin ? "KitchenOwner" : "Users";
        const userData = isKitchenLogin ? response.data.kitchen : response.data.user;
        
        localStorage.setItem(key, JSON.stringify(userData));
        toast.success(`Logged in successfully as ${isKitchenLogin ? "Kitchen" : "User"}`);
        reset();
        onLoginSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg mb-4">Login</h3>

          <div className="tabs tabs-boxed mb-6">
            <button
              type="button"
              className={`tab tab-lg flex-1 ${!isKitchenLogin ? "tab-active" : ""}`}
              onClick={() => setIsKitchenLogin(false)}
            >
              User Login
            </button>
            <button
              type="button"
              className={`tab tab-lg flex-1 ${isKitchenLogin ? "tab-active" : ""}`}
              onClick={() => setIsKitchenLogin(true)}
            >
              Kitchen Login
            </button>
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <span className="text-error text-sm mt-1">{errors.email.message}</span>
            )}
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            {errors.password && (
              <span className="text-error text-sm mt-1">{errors.password.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full mb-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-center">
            <span className="text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="link link-primary"
                onClick={onClose}
              >
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default Login;