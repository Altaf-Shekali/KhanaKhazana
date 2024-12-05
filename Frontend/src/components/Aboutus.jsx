import React from 'react';
import Navbar from './Navbar';

function Aboutus() {
  return (
    <>
    <Navbar/>
      <div className="relative w-full h-screen bg-white-900 flex items-center justify-center">
        {/* Video Background */}
        <video
          className="relative w-full max-w-[80%] h-auto max-h-[80%] object-cover rounded-lg shadow-lg sm:w-[90%] sm:h-auto"
          src="video.mp4"
          autoPlay
          loop
          muted
        />
      </div>
    </>
  );
}

export default Aboutus;
