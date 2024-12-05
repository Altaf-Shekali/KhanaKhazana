import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

function Kitchens() {
  const [kitchens, setKitchens] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-20">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="font-semibold text-2xl pb-4 dark:text-white">
            Explore Our <span className="text-orange-500">Kitchens :)</span>
          </h1>
        </div>

        <div className="container mx-auto px-4 py-8">
          {kitchens.length > 0 ? (
            <Slider {...settings}>
              {kitchens.map((kitchen, index) => (
                <div key={index} className="px-4">
                  <div className="bg-[#f9efe5] shadow-lg p-12 text-center transition-transform duration-300 transform hover:scale-105">
                    <img
                      src={kitchen.image}
                      alt={kitchen.name}
                      className="w-50 h-50 mx-auto rounded-full object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">{kitchen.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {kitchen.location || "Location not available"}
                    </p>
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
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">
              No kitchens found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Kitchens;
