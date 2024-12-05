import React, { useState } from 'react';
import Slider from 'react-slick';
import { useAuth } from '../conetxt/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import plans from '../../public/plans.json';
import Navbar from './Navbar';

const Membership = () => {
  const [authUser] = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [message, setMessage] = useState('');

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true, dots: true },
      },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true } },
    ],
  };

  const handleProtectedRedirect = (event) => {
    if (!authUser) {
      event.preventDefault();
      setMessage('Not logged in. Please log in to pay.');
      return;
    }
    navigate('/Basic');
  };

  const getPlanColor = (name) => {
    switch (name) {
      case 'Bronze': return 'bg-yellow-700 text-yellow-100';
      case 'Silver': return 'bg-gray-400 text-gray-800';
      case 'Gold': return 'bg-yellow-500 text-yellow-100';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen item-center mx-auto justify-center mt-20 px-4">
        <h2 className="text-center text-3xl font-bold mb-8 dark:text-white">Choose Your Membership</h2>
        <Slider {...settings}>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-6 cursor-pointer transform hover:scale-105 transition-transform duration-300 ${getPlanColor(plan.name)}`}
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="rounded-lg shadow-lg p-8 text-center">
                <img src={plan.logo} alt={`${plan.name} logo`} className="w-24 h-24 mx-auto mb-4 rounded-full object-cover" />
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <p className="text-gray-200 mb-3">{plan.description}</p>
                <p className="text-xl font-semibold">₹{plan.price}</p>
              </div>
            </div>
          ))}
        </Slider>

        {selectedPlan && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">{selectedPlan.name} Plan Benefits</h2>
              <ul className="text-gray-700 mb-4">
                {selectedPlan.benefits.map((benefit, idx) => (
                  <li key={idx} className="mb-2">- {benefit}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mb-4">Subscribe Now:</h3>
              <div className="text-center">
                <Link
                  to="/Basic" className="text-blue-500 font-semibold"
                  onClick={(event) => {
                    handleProtectedRedirect(event);
                  }}
                >
                  PAY NOW 
                </Link>
              </div>
              {message && <p className="text-red-600 mt-2">{message}</p>}
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={() => setSelectedPlan(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Membership;
