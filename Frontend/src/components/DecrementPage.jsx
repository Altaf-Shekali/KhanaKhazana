import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DecrementPage = () => {
  const [searchParams] = useSearchParams();
  const [count, setCount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = searchParams.get("user_id");
    const remainingUses = parseInt(searchParams.get("remaining_uses"), 10);

    if (!userId || isNaN(remainingUses)) {
      toast.error("Invalid QR data.");
      navigate("/");
      return;
    }

    if (remainingUses > 0) {
      setCount(remainingUses - 1);
    } else {
      toast.error("No remaining uses!");
      navigate("/");
    }
  }, [searchParams, navigate]);

  const handleConfirm = () => {
    toast.success("Count decremented successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        {count !== null ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Remaining Uses: {count}
            </h1>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Confirm Decrement
            </button>
          </>
        ) : (
          <p className="text-gray-500">Processing...</p>
        )}
      </div>
    </div>
  );
};

export default DecrementPage;
