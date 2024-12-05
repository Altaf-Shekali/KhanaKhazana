import React from 'react';
import bg from "../../public/bg.jpg";

function Banner() {
  return (
    <>
      <div
        className="relative max-w-full container mx-auto md:px-20 px-4 flex flex-col 
        bg-cover bg-center h-auto md:h-[60vh] lg:h-[70vh] rounded-lg mt-20 my-10"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>

        {/* Content */}
        <div className="relative w-full mt-12 md:mt-20 lg:mt-24 text-center">
          <h1 className="font-extrabold text-5xl md:text-6xl lg:text-7xl mb-6 text-white font-bold p-5 md:p-10 text-4xl md:text-5xl lg:text-6xl">
            Welcome to <span className="text-orange-500">Khana Khazana</span>
          </h1>
          <p className="text-white text-xl md:text-2xl lg:text-3xl mb-4 md:mb-8 lg:mb-10">
            A platform that connects you to the best kitchen and mess in town.
          </p>
          <p>
          <span className="text-gray-400 text-xl md:text-2xl lg:text-3xl mb-4 md:mb-8 lg:mb-10">"Your city's flavors, on your schedule."</span>

          </p>
        </div>
        
      </div>
    </>
  );
}

export default Banner;
