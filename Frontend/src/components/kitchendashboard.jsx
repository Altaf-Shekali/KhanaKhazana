import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";

const KitchenDashboard = ({ kitchenId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:4100/kitchen/${kitchenId}/transactions`);
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // Optionally, poll or refresh periodically:
    // const interval = setInterval(fetchTransactions, 60000);
    // return () => clearInterval(interval);
  }, [kitchenId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h2 className="text-2xl font-bold mb-6">Kitchen Dashboard</h2>
        {loading ? (
          <p className="text-blue-600">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p className="text-gray-600">No transactions recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Plan</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Meal Count</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Breakdown</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap">{tx.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tx.customerEmail}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{tx.plan}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tx.mealCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm">
                        Basic: {tx.breakdown.basic}, Silver: {tx.breakdown.silver}, Gold: {tx.breakdown.gold}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(tx.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default KitchenDashboard;