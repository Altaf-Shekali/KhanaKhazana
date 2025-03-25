import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

function Kitchens() {
  const [kitchens, setKitchens] = useState([]);
  const navigate = useNavigate(); // Navigation hook for redirect

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await axios.get("http://localhost:4100/kitchen");
        setKitchens(response.data);
      } catch (error) {
        console.error("Error fetching kitchen data:", error);
      }
    };

    fetchKitchens();
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20">
      <div className="mt-28 items-center justify-center text-center">
        <h1 className="font-semibold text-2xl pb-4 dark:text-white">
          Explore Our <span className="text-orange-500">Kitchens :)</span>
        </h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        {kitchens.length > 0 ? (
          <>
            <Slider {...settings}>
              {kitchens.map((kitchen, index) => (
                <div key={index} className="px-4">
                  <div
                    className="bg-[#f9efe5] shadow-lg p-6 text-center 
                    rounded-lg min-h-[320px] flex flex-col justify-between 
                    transition-transform duration-300 transform hover:scale-105"
                  >
                    {/* Image Section */}
                    {kitchen.images && kitchen.images.length > 0 ? (
                      <img
                        src={`http://localhost:4100/${kitchen.images[0]}`}
                        alt={kitchen.name}
                        className="w-full h-[200px] object-cover rounded-md mb-4"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-kitchen-image.jpg"; // Optional fallback
                        }}
                      />
                    ) : (
                      <div className="w-full h-[200px] bg-gray-300 rounded-md flex items-center justify-center">
                        <p className="text-sm text-gray-400">No Image Available</p>
                      </div>
                    )}

                    {/* Kitchen Details */}
                    <h3 className="text-xl font-semibold text-gray-800">{kitchen.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {kitchen.location || "Location not available"}
                    </p>

                    {/* Rating Display */}
                    <div className="flex justify-center items-center space-x-1">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <span
                          key={starIndex}
                          className={`text-2xl ${
                            starIndex < Math.round(kitchen.rating || 0)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            {/* View All Kitchens Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate("/kitchen")} // Redirect to Kitchens page
                className="bg-orange-500 text-white px-6 py-2 rounded-md 
                hover:bg-orange-600 transition duration-300"
              >
                View All Kitchens
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No kitchens found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Kitchens;