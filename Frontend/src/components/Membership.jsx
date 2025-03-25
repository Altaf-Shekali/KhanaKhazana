import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useAuth } from '../conetxt/AuthProvider';
import { useNavigate } from 'react-router-dom';
import plans from '../../public/plans.json';
import Navbar from './Navbar';

const Membership = () => {
  const [authUser] = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // Added loading state

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true, dots: true } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true } },
    ],
  };

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Get plan color based on plan name
  const getPlanColor = (name) => {
    switch (name) {
      case 'Bronze': return 'bg-yellow-700 text-yellow-100';
      case 'Silver': return 'bg-gray-400 text-gray-800';
      case 'Gold': return 'bg-yellow-500 text-yellow-100';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  // Handle payment button click
  const handlePayment = async () => {
    if (!selectedPlan || !authUser) {
      setMessage('No plan selected or user not logged in');
      return;
    }

    setIsProcessing(true);
    setMessage('');

    try {
      const amount = selectedPlan.price;

      // Fetch order details from backend
      const response = await fetch('http://localhost:4100/v1/createorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: 'rzp_test_zYvgRPI9tKUrym',
        amount: data.amount,
        currency: data.currency,
        name: 'Khanakhazana',
        description: `Payment for ${selectedPlan.name} Plan`,
        order_id: data.order_id,
        handler: async function (response) {
          console.log('Payment Success:', response);
      
          // Verify payment with backend and update plan
          const verifyResponse = await fetch('http://localhost:4100/v1/verifypayment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: authUser._id,  // Send user ID
              plan: selectedPlan.name.toLowerCase(), // Send selected plan
            }),
          });
      
          const verifyData = await verifyResponse.json();
      
          if (verifyData.success) {
            alert(`Payment Verified! ✅ Plan Activated: ${selectedPlan.name}`);
            // **Update local storage with the updated user data from the verify endpoint**
            localStorage.setItem("Users", JSON.stringify(verifyData.user));
            navigate('/profile');
          } else {
            alert("Payment verification failed! ❌");
          }
        },
        prefill: {
          name: authUser.name || 'Test User',
          email: authUser.email || 'test@example.com',
          contact: '9000090000',
        },
        theme: { color: '#3399cc' },
      };      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      setMessage(error.message || 'Payment failed! Please try again.');
    } finally {
      setIsProcessing(false);
    }
};

  return (
    <>
      <Navbar />
      <div className="max-w-screen mx-auto justify-center mt-20 px-4">
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
                <button
                  className={`bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold ${
                    isProcessing || !authUser ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handlePayment}
                  disabled={isProcessing || !authUser}
                  title={!authUser ? 'Please log in to proceed with payment' : ''}
                >
                  {isProcessing ? 'Processing...' : 'PAY NOW'}
                </button>
                {!authUser && (
                  <p className="text-red-600 mt-2">Please log in to proceed with payment.</p>
                )}
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