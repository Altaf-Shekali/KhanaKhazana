import React, { useState, useEffect } from 'react';
import Cards from "../components/cards";
import axios from "axios";

function Kitchenss() {
  const [Kitchen, setKitchen] = useState([]); // Correct state for fetched data
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getKitchen = async () => {
      try {
        const res = await axios.get("http://localhost:4100/kitchen");
        console.log(res.data);
        setKitchen(res.data); // Set fetched data
      } catch (error) {
        console.log("Error fetching kitchen data:", error);
      }
    };
    getKitchen();
  }, []); // Empty dependency array ensures it runs only once

  // Filter the kitchens based on the search term
  const filteredKitchens = Kitchen.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())) // Handle undefined location
  );

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <div className="mt-28 items-center justify-center text-center">
            <h1 className="text-2xl md:text-4xl dark:text-white">
              Explore our <span className="text-orange-500">Kitchens :)</span>
            </h1>
            <h6 className="mt-12 dark:text-white">
              These are our kitchens and messes where you can enjoy your meals.
            </h6>
            {/* Search Bar */}
            <div className="relative flex justify-center mb-10 mt-5 px-2 py-2">
              <label className="px-1 py-1 input input-bordered rounded-md flex items-center gap-2 w-full max-w-md bg-white shadow-lg">
                <input
                  type="text"
                  className="grow px-4 py-2 rounded-l-md border-none"
                  placeholder="Search by name or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-6 w-6 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredKitchens.length > 0 ? (
            filteredKitchens.map((item) => <Cards key={item.name} item={item} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-300">
              No kitchens found matching your search.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Kitchenss;
