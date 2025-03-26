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
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <section id="faq" className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Find answers to the most common questions about our platform.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    How does the subscription model work?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    Our subscription model is based on meal credits. You purchase a plan with a certain number of meal credits that can be redeemed at any of our partner kitchens.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    Can I use my subscription at any location?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    Yes, your subscription can be used at any of our partner kitchens across multiple locations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    What is the refund policy?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    We offer hassle-free refunds for unused meal credits.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    How do I modify my subscription?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    You can modify your subscription anytime through the app.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    Is there a mobile app available?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    No, we are working on a mobile application.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    Do you offer corporate plans?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    This feature is coming soon...
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    How is payment handled?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    All payments are processed securely through Razorpay.
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