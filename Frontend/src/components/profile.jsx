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
    const storedRecentKitchens = JSON.parse(localStorage.getItem("RecentKitchens")) || [];

    if (storedUser) {
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
    } else {
      navigate("/");
    }

    setRecentKitchens(storedRecentKitchens);
    fetchKitchens();
  }, [navigate, fetchKitchens]);

  const debounceSearch = useCallback(
    (func, delay) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      };
    },
    []
  );

  const handleSearch = useCallback(
    debounceSearch((term) => {
      const filtered = kitchens.filter(kitchen =>
        kitchen.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredKitchens(filtered);
    }, 300),
    [kitchens, debounceSearch]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  // New function to record the meal transaction in the selected kitchen
  const recordMealTransaction = async (parsedData) => {
    try {
      // Prepare payload to record the transaction
      const payload = {
        customerId: parsedData.id,
        customerName: user.fullname,
        customerEmail: user.email,
        plan: parsedData.plan,
        mealCount: 1, // assume 1 meal is used per transaction
        breakdown: {
          basic: parsedData.plan.toLowerCase() === "basic" ? 1 : 0,
          silver: parsedData.plan.toLowerCase() === "silver" ? 1 : 0,
          gold: parsedData.plan.toLowerCase() === "gold" ? 1 : 0,
        }
      };
      // POST transaction to the selected kitchen's transactions endpoint
      await axios.post(`http://localhost:4100/kitchen/${selectedKitchen}/transactions`, payload);
    } catch (error) {
      console.error("Error recording meal transaction:", error);
      toast.error("Failed to record meal transaction.");
    }
  };

  // Updated QR scan handler: decrement remaining meals and record transaction
  const handleQrScan = async () => {
    if (!qrData || !selectedKitchen) {
      toast.error("Please select a kitchen first!");
      return;
    }

    try {
      const parsedData = JSON.parse(qrData);

      if (!parsedData.plan) {
        toast.error("Active subscription required!");
        return;
      }

      if (parsedData.remainingUses > 0) {
        const updatedUses = Math.max(parsedData.remainingUses - 1, 0);
        
        setUser(prevUser => {
          const updatedUser = { ...prevUser, remainingUses: updatedUses };
          localStorage.setItem("Users", JSON.stringify(updatedUser));
          return updatedUser;
        });

        setCount(updatedUses);
        setQrData(JSON.stringify({ ...parsedData, remainingUses: updatedUses }));

        setRecentKitchens(prev => {
          const updated = [
            selectedKitchen,
            ...prev.filter(k => k !== selectedKitchen)
          ].slice(0, 3);
          localStorage.setItem("RecentKitchens", JSON.stringify(updated));
          return updated;
        });

        // Record the meal transaction for this kitchen
        await recordMealTransaction(parsedData);
        toast.success(`Meal added to ${selectedKitchen}!`);
      } else {
        toast.error("No remaining meals! Please renew your plan.");
      }
    } catch (error) {
      toast.error("Error processing payment.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Users");
    toast.success("Logout successful");
    navigate("/");
  };

  const getUserPlanConfig = () => {
    const userPlan = user?.plan?.toLowerCase();
    return planConfig[userPlan] || planConfig.default;
  };

  const getUserInitials = (name) => {
    if (!name) return "";
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const renderPlanBadge = () => {
    const { primary, text } = getUserPlanConfig();
    return (
      <span className={`${primary} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1`}>
        {user?.plan || 'No Plan'}
        {user?.plan?.toLowerCase() === 'gold' && <FiStar className="text-yellow-300" />}
      </span>
    );
  };

  const renderProgressBar = () => {
    const maxMeals = 40;
    const progress = (count / maxMeals) * 100;
    const { primary } = getUserPlanConfig();

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className={`${primary} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  const hasActivePlan = user?.plan && user.plan !== "null";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {user ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Overview */}
            <div className="lg:col-span-1 space-y-6">
              <div className={`bg-white rounded-xl shadow-lg p-6 border-t-4 ${getUserPlanConfig().accent}`}>
                <div className="flex flex-col items-center">
                  <div className={`w-24 h-24 ${getUserPlanConfig().secondary} rounded-full flex items-center justify-center mb-4`}>
                    <span className={`text-2xl font-bold ${getUserPlanConfig().text}`}>
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
                  <button
                    className={`w-full py-2 px-4 border ${getUserPlanConfig().accent} rounded-lg ${getUserPlanConfig().text} hover:${getUserPlanConfig().secondary} transition-colors`}
                    onClick={() => toast('Edit profile feature coming soon!')}
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <FiCalendar className="mr-2 text-gray-400" />
                    <span>Joined: {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiPackage className="mr-2 text-gray-400" />
                    <span>Status: {hasActivePlan ? 'Active' : 'Inactive'}</span>
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

            {/* Right Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Subscription Status */}
              <div className={`bg-white rounded-xl shadow-lg p-12 border-t-4 ${getUserPlanConfig().accent}`}>
                <h3 className="text-lg font-semibold mb-4">Subscription Details</h3>
                {renderProgressBar()}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 ${getUserPlanConfig().secondary} rounded-lg`}>
                    <p className="text-sm text-gray-600 mb-1">Current Plan</p>
                    <p className={`text-xl font-semibold ${getUserPlanConfig().text}`}>
                      {user?.plan || 'No Active Plan'}
                    </p>
                  </div>
                  <div className={`p-4 ${getUserPlanConfig().secondary} rounded-lg`}>
                    <p className="text-sm text-gray-600 mb-1">Remaining Meals</p>
                    <p className={`text-xl font-semibold ${count > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {count > 0 ? `${count} meals` : 'EXPIRED'}
                    </p>
                  </div>
                </div>
                {!hasActivePlan && (
                  <button
                    className={`w-full py-3 ${getUserPlanConfig().primary} hover:opacity-90 text-white rounded-lg transition-all font-semibold`}
                    onClick={() => navigate('/Membership')}
                  >
                    Upgrade Your Plan
                  </button>
                )}
              </div>

              {/* QR Section */}
              {hasActivePlan && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FiStar className={`mr-2 ${getUserPlanConfig().text}`} />
                    Meal QR Code
                  </h3>
                  <div className="text-center">
                    {qrData ? (
                      <div className="p-4 bg-gray-50 rounded-lg inline-block">
                        <QRCode 
                          value={qrData} 
                          size={196}
                          className="mx-auto"
                          fgColor={getUserPlanConfig().hex}
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
              )}

              {/* Kitchen Selection */}
              {hasActivePlan && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="flex items-center text-lg font-semibold mb-4">
                    <FiClock className={`mr-2 ${getUserPlanConfig().text}`} />
                    Kitchen Selection
                  </h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                        placeholder="Search kitchens..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      )}
                    </div>

                    <select
                      className="w-full p-3 border-2 border-gray-200 rounded-lg appearance-none bg-white"
                      value={selectedKitchen}
                      onChange={(e) => setSelectedKitchen(e.target.value)}
                    >
                      <option value="">Select a Kitchen</option>
                      {filteredKitchens.map((kitchen) => (
                        <option key={kitchen._id} value={kitchen._id}>
                          {kitchen.name}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={handleQrScan}
                      className={`w-full py-3 ${getUserPlanConfig().primary} hover:opacity-90 text-white rounded-lg transition-all font-semibold`}
                      disabled={!selectedKitchen}
                    >
                      {selectedKitchen ? `Use Meal at Selected Kitchen` : "Select a Kitchen"}
                    </button>

                    {recentKitchens.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold text-gray-600 mb-3">Recent Kitchens:</h4>
                        <div className="flex flex-wrap gap-2">
                          {recentKitchens.map((kitchenId) => {
                            const kitchen = kitchens.find(k => k._id === kitchenId);
                            return (
                              <button
                                key={kitchenId}
                                onClick={() => setSelectedKitchen(kitchenId)}
                                className={`px-4 py-2 ${getUserPlanConfig().secondary} hover:${getUserPlanConfig().primary} rounded-full transition-colors text-sm ${getUserPlanConfig().text}`}
                              >
                                {kitchen?.name || kitchenId}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            {loading ? (
              <div className="text-blue-600">Loading user data...</div>
            ) : (
              <div className="text-gray-500">No user data found</div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
