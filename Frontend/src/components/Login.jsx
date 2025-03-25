import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [isKitchenLogin, setIsKitchenLogin] = useState(false);
  const modalRef = useRef(null); // ✅ UseRef for modal control

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Function to open modal manually
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  // ✅ Function to close modal
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  // ✅ Handles login
  const onSubmit = async (data) => {
    const userInfo = { email: data.email, password: data.password };

    try {
      if (isKitchenLogin) {
        const kitchenOwnerResponse = await axios.post(
          "http://localhost:4100/kitchen/login",
          userInfo
        );

        if (kitchenOwnerResponse.data) {
          toast.success("Logged in successfully as Kitchen Owner");
          localStorage.setItem("KitchenOwner", JSON.stringify(kitchenOwnerResponse.data.user));
          closeModal(); // ✅ Close modal on success
          setTimeout(() => navigate("/kitchendashboard"), 1000);
        }
      } else {
        const userResponse = await axios.post("http://localhost:4100/user/login", userInfo);

        if (userResponse.data) {
          toast.success("Logged in successfully");
          localStorage.setItem("Users", JSON.stringify(userResponse.data.user));
          closeModal(); // ✅ Close modal on success
          setTimeout(() => navigate("/profile"), 1000);
        }
      }
    } catch (error) {
      toast.error("Invalid credentials or user not found.");
    }
  };

  return (
    <div>
      {/* ✅ The trigger to open modal (remove this if using another way to open) */}
      <button onClick={openModal} className="hidden"></button>

      {/* ✅ Dialog that only opens when triggered */}
      <dialog ref={modalRef} id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* Modal Close Button */}
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">Login</h3>

            {/* Toggle Button */}
            <div className="flex justify-center my-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-l-lg ${!isKitchenLogin ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setIsKitchenLogin(false)}
              >
                User Login
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-r-lg ${isKitchenLogin ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setIsKitchenLogin(true)}
              >
                Kitchen Login
              </button>
            </div>

            {/* Email Field */}
            <div className="mt-4 space-y-2">
              <span>Email:</span>
              <br />
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            {/* Password Field */}
            <div className="mt-4 space-y-2">
              <span>Password:</span>
              <br />
              <input
                type="password"
                placeholder="Enter your Password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            {/* Login Button & Signup Link */}
            <div className="flex justify-around mt-4">
              <button
                type="submit"
                className="bg-orange-500 text-white rounded-md px-3 py-1 hover:bg-orange-700 duration-200"
              >
                Login
              </button>
              <p className="text-xl">
                Not registered?{" "}
                <Link to="/Signup" className="underline text-blue-500 cursor-pointer">
                  Signup
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
