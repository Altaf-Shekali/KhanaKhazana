import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import Footer from "./Footer";
import {
  FiMail, FiCalendar, FiPackage, FiSettings,
  FiClock, FiLogOut, FiStar
} from "react-icons/fi";

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
      try {
        const parsedKitchen = JSON.parse(storedKitchen);
        setKitchen(parsedKitchen);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing kitchen data:", error);
        localStorage.removeItem("KitchenOwner");
        navigate("/");
      }
    } else if (storedUser) {
      try {
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
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("Users");
        navigate("/");
      }
    } else {
      navigate("/");
    }

    setRecentKitchens(storedRecentKitchens);
  }, [navigate, fetchKitchens]);

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

  const renderPlanBadge = () => {
    if (!user?.plan) return null;
    const { primary, text } = planConfig[user.plan.toLowerCase()] || planConfig.default;
    return (
      <span className={`${primary} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1`}>
        {user.plan}
        {user.plan?.toLowerCase() === 'gold' && <FiStar className="text-yellow-300" />}
      </span>
    );
  };

  const renderKitchenProfile = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Kitchen Management</h3>
          <button
            onClick={() => navigate('/kitchenmenu', { state: { kitchenId: kitchen?._id } })}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Manage Menu
          </button>
        </div>
      </div>
    </div>
  );

  const renderUserProfile = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className={`bg-white rounded-xl shadow-lg p-6 border-t-4 ${planConfig[user?.plan?.toLowerCase()]?.accent || planConfig.default.accent}`}>
          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 ${planConfig[user?.plan?.toLowerCase()]?.secondary || planConfig.default.secondary} rounded-full flex items-center justify-center mb-4`}>
              <span className={`text-2xl font-bold ${planConfig[user?.plan?.toLowerCase()]?.text || planConfig.default.text}`}>
                {getUserInitials(user?.fullname)}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              {user?.fullname || "Anonymous User"}
              {renderPlanBadge()}
            </h2>
            <p className="text-gray-600 mb-4 flex items-center">
              <FiMail className="mr-2 text-gray-400" />
              {user?.email}
            </p>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center text-gray-600">
              <FiCalendar className="mr-2 text-gray-400" />
              <span>Joined: {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FiPackage className="mr-2 text-gray-400" />
              <span>Status: {user?.plan ? 'Active' : 'Inactive'}</span>
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

      {/* Right Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Subscription, QR, Kitchen Selection */}
        {user?.plan && (
          <>
            {/* Subscription */}
            <div className={`bg-white rounded-xl shadow-lg p-6 border-t-4 ${planConfig[user.plan.toLowerCase()]?.accent || planConfig.default.accent}`}>
              <h3 className="text-lg font-semibold mb-4">Subscription Details</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className={`${planConfig[user.plan.toLowerCase()]?.primary || planConfig.default.primary} h-2.5 rounded-full`}
                  style={{ width: `${(count / 40) * 100}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 ${planConfig[user.plan.toLowerCase()]?.secondary || planConfig.default.secondary} rounded-lg`}>
                  <p className="text-sm text-gray-600 mb-1">Current Plan</p>
                  <p className={`text-xl font-semibold ${planConfig[user.plan.toLowerCase()]?.text || planConfig.default.text}`}>{user.plan}</p>
                </div>
                <div className={`p-4 ${planConfig[user.plan.toLowerCase()]?.secondary || planConfig.default.secondary} rounded-lg`}>
                  <p className="text-sm text-gray-600 mb-1">Remaining Meals</p>
                  <p className={`text-xl font-semibold ${count > 0 ? 'text-green-600' : 'text-red-600'}`}>{count > 0 ? `${count} meals` : 'EXPIRED'}</p>
                </div>
              </div>
              {count <= 0 && (
                <button
                  className={`w-full py-3 ${planConfig[user.plan.toLowerCase()]?.primary || planConfig.default.primary} hover:opacity-90 text-white rounded-lg font-semibold`}
                  onClick={() => navigate('/Membership')}
                >
                  Renew Your Plan
                </button>
              )}
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FiStar className="mr-2" /> Meal QR Code
              </h3>
              <div className="text-center">
                {qrData ? (
                  <div className="p-4 bg-gray-50 rounded-lg inline-block">
                    <QRCode
                      value={qrData}
                      size={196}
                      className="mx-auto"
                      fgColor={planConfig[user.plan.toLowerCase()]?.hex || planConfig.default.hex}
                    />
                    <p className="mt-3 text-sm text-gray-500">
                      Valid at {selectedKitchen || "any kitchen"}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">QR code unavailable</p>
                )}
              </div>
            </div>

            {/* Kitchen Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Kitchen Selection</h3>
              <input
                type="text"
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
                placeholder="Search kitchens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={selectedKitchen}
                onChange={(e) => setSelectedKitchen(e.target.value)}
              >
                <option value="">Select a Kitchen</option>
                {filteredKitchens.map((k) => (
                  <option key={k._id} value={k._id}>{k.name}</option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-24 pb-12 px-4 max-w-6xl mx-auto">
        {user ? renderUserProfile() :
         kitchen ? renderKitchenProfile() :
         <div className="text-center p-6 bg-white rounded-xl shadow-sm">
           {loading ? <div className="text-blue-600">Loading...</div> : <div className="text-gray-500">No data found</div>}
         </div>}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
