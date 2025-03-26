import React from 'react';
import { Calendar, MapPin, CreditCard, RefreshCw, MessageSquare, Shield } from 'lucide-react';

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-base-800/50 p-6 rounded-lg shadow-md transition-colors duration-300">
      <div className="bg-primary/10 dark:bg-primary/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose KhanaKhazana?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We've designed our platform to make meal subscriptions as flexible and convenient as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureItem 
            icon={<Calendar className="h-8 w-8 text-primary dark:text-primary-light" />} 
            title="Flexible Subscriptions" 
            description="Change, pause, or cancel your meal plan anytime. No long-term commitments required."
          />
          <FeatureItem 
            icon={<MapPin className="h-8 w-8 text-primary dark:text-primary-light" />} 
            title="Multi-Location Access" 
            description="Use your subscription at any of our partner kitchens across multiple locations."
          />
          <FeatureItem 
            icon={<CreditCard className="h-8 w-8 text-primary dark:text-primary-light" />} 
            title="Hassle-free Payments" 
            description="Secure payments via Razorpay with automatic renewal options for convenience."
          />
          <FeatureItem 
            icon={<RefreshCw className="h-8 w-8 text-primary dark:text-primary-light" />} 
            title="Easy Refunds" 
            description="Request refunds for unused meals with just a few clicks. No questions asked."
          />
          <FeatureItem 
            icon={<MessageSquare className="h-8 w-8 text-primary dark:text-primary-light" />} 
            title="Responsive Support" 
            description="Our dedicated customer support team is always ready to assist with any issues."
          />
          <FeatureItem 
            icon={<Shield className="h-8 w-8 text-primary dark:text-primary-light" />} 
            title="Quality Guarantee" 
            description="All our partner kitchens adhere to strict quality and hygiene standards."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;