
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const FAQ = () => {
  return (
    <>
      <div className="bg-base-100 dark:bg-base-800 text-text-light dark:text-text-dark">
      <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to the most common questions about our platform
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                How does the subscription model work?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Our subscription model is based on meal credits. You purchase a plan with a certain number of meal credits that can be redeemed at any of our partner kitchens. These credits are valid for a specific duration depending on your plan. You can use multiple credits in a single day or spread them out as you prefer.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                Can I use my subscription at any location?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Yes, your subscription can be used at any of our partner kitchens across multiple locations. This makes it convenient for you to enjoy meals whether you're at work, college, or home. Just show your app at the partner kitchen to redeem your meal.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                What is the refund policy?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                We offer hassle-free refunds for unused meal credits. You can request a refund through the app, and the amount will be credited back to your original payment method within 5-7 business days. For partial subscription refunds, the refund amount is calculated based on the remaining credits and the validity period.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                How do I modify my subscription?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                You can modify your subscription anytime through the app. This includes upgrading or downgrading your plan, pausing your subscription, or canceling it altogether. Changes to your subscription will take effect immediately or from the next billing cycle, depending on the modification.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                Is there a mobile app available?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                No, we are working on mobile appliction . Once we ready with app we wiil inform you, then you can download the app from the respective app stores. The app allows you to view your subscription details, redeem meals, find partner kitchens, and manage your account on the go.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                Do you offer corporate plans?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                This feature is coming soon...{/* Yes, we offer customized corporate plans for businesses of all sizes. These plans come with additional benefits such as centralized billing, detailed usage reports, and dedicated account management. Please contact our sales team for more information on corporate subscriptions. */}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                How is payment handled?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                All payments are processed securely through Razorpay, our payment gateway partner. We accept all major credit and debit cards, UPI, net banking, and popular wallets. You can opt for auto-renewal of your subscription for uninterrupted service.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
 

      </div>

    </>
     );
    };

export default FAQ;