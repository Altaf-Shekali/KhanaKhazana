import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [kitchens, setKitchens] = useState([]);

  useEffect(() => {
    const loadKitchens = () => {
      const allKeys = Object.keys(localStorage).filter(key => key.startsWith("Kitchen_"));
      const kitchenData = allKeys.map(key => ({
        name: key.replace("Kitchen_", ""),
        ...JSON.parse(localStorage.getItem(key))
      }));
      setKitchens(kitchenData);
    };
    loadKitchens();
  }, []);

  const handleGlobalReset = () => {
    Object.keys(localStorage)
      .filter(key => key.startsWith("Kitchen_"))
      .forEach(key => {
        localStorage.setItem(key, JSON.stringify({
          servedMeals: 0,
          paymentHistory: []
        }));
      });
    toast.success("All kitchens reset!");
    setKitchens([]);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleGlobalReset}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Reset All Kitchens
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kitchens.map((kitchen, index) => (
          <div key={index} className="p-4 bg-white rounded shadow">
            <h3 className="text-xl font-bold mb-2">{kitchen.name}</h3>
            <p>Total Meals: {kitchen.servedMeals}</p>
            <p>Total Payments: {kitchen.paymentHistory?.length || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
