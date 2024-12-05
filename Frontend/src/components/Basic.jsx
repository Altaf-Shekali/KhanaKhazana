import React, { useEffect } from 'react';
import Navbar from './Navbar';

function Basic() {
  useEffect(() => {
    // Add Razorpay script to all buttons
    const addRazorpayButton = (buttonId, paymentButtonId) => {
      const buttonDiv = document.getElementById(buttonId);
      if (buttonDiv && !buttonDiv.querySelector('script')) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
        script.setAttribute('data-payment_button_id', paymentButtonId);
        script.async = true;
        buttonDiv.appendChild(script);
      }
    };

    // Same Razorpay button on every card
    const paymentButtonId = 'pl_OHWOcl0ZITjYzN'; // Replace with your Razorpay payment button ID
    ['razorpay-button-basic', 'razorpay-button-silver', 'razorpay-button-gold'].forEach((id) => {
      addRazorpayButton(id, paymentButtonId);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-full flex flex-col items-center justify-center mt-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
          {/* Basic Plan Card */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-orange-500 mb-4">Basic Plan</h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Subscribe to the Basic Plan and enjoy:
            </p>
            <ul className="text-left mb-6 text-gray-600 dark:text-gray-400 list-disc list-inside">
              <li>30 Meals + Multi-city flexibility</li>
              <li>Customer support</li>
              <li>Monthly subscription</li>
            </ul>
            <div id="razorpay-button-basic" className="mt-6"></div>
          </div>

          {/* Silver Plan Card */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-orange-500 mb-4">Silver Plan</h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Subscribe to the Silver Plan and enjoy:
            </p>
            <ul className="text-left mb-6 text-gray-600 dark:text-gray-400 list-disc list-inside">
              <li>30 Meals with unlimited food</li>
              <li>Multi-city flexibility</li>
              <li>Monthly subscription</li>
            </ul>
            <div id="razorpay-button-silver" className="mt-6"></div>
          </div>
        </div>

        {/* Gold Plan Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center mt-10 max-w-lg w-full">
          <h1 className="text-2xl font-bold text-orange-500 mb-4">Gold Plan</h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
            Subscribe to the Gold Plan and enjoy:
          </p>
          <ul className="text-left mb-6 text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>35 Meals with unlimited food + Multi-city flexibility</li>
            <li>Priority support</li>
            <li>Monthly subscription</li>
          </ul>
          <div id="razorpay-button-gold" className="mt-6"></div>
        </div>
      </div>
    </>
  );
}

export default Basic;
