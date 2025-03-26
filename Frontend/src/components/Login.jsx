import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import Footer from "./Footer";
import { FiMail, FiCalendar, FiPackage, FiSettings, FiClock, FiLogOut, FiStar } from "react-icons/fi";

const planConfig = {
  basic: {
    primary: "bg-amber-600",
    secondary: "bg-black-100",
    text: "text-black-600",
    accent: "border-amber-500",
    hex: "#000"
  },
  silver: {
    primary: "bg-gray-600",
    secondary: "bg-gray-100",
    text: "text-gray-600",
    accent: "border-gray-600",
    hex: "#000"
  },
  gold: {
    primary: "bg-yellow-500",
    secondary: "bg-yellow-100",
    text: "text-yellow-600",
    accent: "border-yellow-500",
    hex: "#000"
  },
  default: {
    primary: "bg-blue-600",
    secondary: "bg-blue-100",
    text: "text-blue-600",
    accent: "border-blue-600",
    hex: "#2563eb"
  },
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [kitchen, setKitchen] = useState(null);
  const [kitchens, setKitchens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredKitchens, setFilteredKitchens] = useState([]);
  const [recentKitchens, setRecentKitchens] = useState([]);
  const [count, setCount] = useState(0);
  const [qrData, setQrData] = useState("");
  const [selectedKitchen, setSelectedKitchen] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchKitchens = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:4100/kitchen");
      setKitchens(response.data);
      setFilteredKitchens(response.data);
    } catch (error) {
      console.error("Error fetching kitchen data:", error);
      toast.error("Failed to fetch kitchen data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("Users");
    const storedKitchen = localStorage.getItem("KitchenOwner");
    const storedRecentKitchens = JSON.parse(localStorage.getItem("RecentKitchens")) || [];

    if (storedKitchen) {
      const parsedKitchen = JSON.parse(storedKitchen);
      setKitchen(parsedKitchen);
      setLoading(false);
    } else if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      const validatePlan = () => {
        if (!parsedUser.plan) {
          parsedUser.remainingUses = 0;
          setQrData("");
          toast.error("You don't have an active subscription. Please subscribe first.");
          return false;
        }
        return true;
      };

      if (validatePlan()) {
        const savedCount = parsedUser.remainingUses ?? 30;
        setCount(savedCount);
        setQrData(JSON.stringify({
          id: parsedUser._id,
          email: parsedUser.email,
          plan: parsedUser.plan,
          remainingUses: savedCount,
        }));
      }

      setUser(parsedUser);
      localStorage.setItem("Users", JSON.stringify(parsedUser));
      fetchKitchens();
    } else {
      navigate("/");
    }

    setRecentKitchens(storedRecentKitchens);
  }, [navigate, fetchKitchens]);

  // ... Keep all existing user-related functions unchanged ...

  const handleLogout = () => {
    localStorage.removeItem("Users");
    localStorage.removeItem("KitchenOwner");
    toast.success("Logout successful");
    navigate("/");
  };

  const getUserInitials = (name) => {
    if (!name) return "";
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const renderKitchenProfile = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Kitchen Overview */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-blue-600">
                {getUserInitials(kitchen?.name)}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {kitchen?.name || "Kitchen Name"}
            </h2>
            <p className="text-gray-600 mb-4 flex items-center">
              <FiMail className="mr-2 text-gray-400" />
              {kitchen?.email}
            </p>
            <button
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              onClick={() => navigate('/kitchendashboard')}
            >
              View Dashboard
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center text-gray-600">
              <FiCalendar className="mr-2 text-gray-400" />
              <span>Joined: {new Date(kitchen?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="flex items-center text-lg font-semibold mb-4">
            <FiSettings className="mr-2 text-gray-500" />
            Account Settings
          </h3>
          <button
            className="w-full flex items-center justify-center py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            onClick={handleLogout}
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Right Column - Empty for kitchen */}
      <div className="lg:col-span-2 space-y-6">
        {/* Kitchen-specific content can be added here */}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {user ? (
          // Existing user profile JSX
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ... Keep all existing user profile code unchanged ... */}
          </div>
        ) : kitchen ? (
          renderKitchenProfile()
        ) : (
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            {loading ? (
              <div className="text-blue-600">Loading.</div>
            ) : (
              <div className="text-gray-500">No data found</div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;