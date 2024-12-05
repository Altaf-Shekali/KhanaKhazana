import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0); // Counter for remaining uses
  const [qrData, setQrData] = useState(""); // QR code data
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("Users");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.plan && parsedUser.plan !== "null") {
        const initialCount = parsedUser.remainingUses || 30;
        setCount(initialCount);

        // Generate QR code with user data and count
        const qrUrl = `${window.location.origin}/decrement?user_id=${parsedUser._id}&remaining_uses=${initialCount}`;
        setQrData(qrUrl);
      }
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("Users");
    toast.success("Logged out successfully");
    setTimeout(()=>{
      navigate("/");
      window.location.reload();
    },2000)
   
    
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 max-w-screen-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        {user ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Welcome, {user.fullname}
            </h1>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-600">Email:</span>{" "}
                {user.email}
              </div>
              <div>
                <span className="font-semibold text-gray-600">Your Plan:</span>{" "}
                {user.plan || "No Plan Selected"}
              </div>
            </div>

            {user.plan && user.plan !== "null" && (
              <div className="mt-6 text-center space-y-4">
                <div>
                  <span className="font-semibold text-gray-600">
                    Remaining Uses:
                  </span>{" "}
                  {count}
                </div>
                <div>
                  {qrData ? (
                    <QRCode value={qrData} />
                  ) : (
                    <p className="text-gray-500">No QR data available.</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Scan this QR code with another device to update the count.
                  </p>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            <p>Loading...</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
