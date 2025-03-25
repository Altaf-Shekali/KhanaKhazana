
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Pre-defined responses for common subscription and payment questions
const knowledgeBase = {
  "refund": "We offer hassle-free refunds for unused meal credits. You can request a refund through the app, and the amount will be credited back to your original payment method within 5-7 business days.",
  "payment methods": "We accept all major credit and debit cards, UPI, net banking, and popular wallets through our payment partner Razorpay. You can also opt for auto-renewal of your subscription.",
  "change subscription": "You can modify your subscription anytime through your account settings. This includes upgrading or downgrading your plan, pausing your subscription, or canceling it altogether.",
  "locations": "Your subscription can be used at any of our partner kitchens across multiple locations. Just show your app at any partner kitchen to redeem your meal.",
  "validity": "Depending on your plan, your meal credits are valid for 45-90 days. The Basic plan is valid for 45 days, Standard for 60 days, and Premium for 90 days.",
  "corporate plans": "We offer customized corporate plans for businesses of all sizes. These plans come with additional benefits such as centralized billing, detailed usage reports, and dedicated account management. Please contact our sales team for more information.",
  "default": "I'd be happy to assist you with your subscription and payment inquiries. You can ask me about refunds, payment methods, modifying your subscription, using locations, validity periods, or corporate plans."
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot',
      text: "Hi there! I'm your subscription assistant. How can I help you with your meal subscription today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      toast({
        title: "Chatbot Opened",
        description: "Ask any questions about your subscription or payments.",
      });
    }
  };

  const generateResponse = (userMessage) => {
    const normalizedMessage = userMessage.toLowerCase();
    
    // Check for keywords in the user's message
    if (normalizedMessage.includes('refund')) {
      return knowledgeBase.refund;
    } else if (normalizedMessage.includes('payment') || normalizedMessage.includes('pay') || normalizedMessage.includes('card')) {
      return knowledgeBase["payment methods"];
    } else if (normalizedMessage.includes('change') || normalizedMessage.includes('modify') || normalizedMessage.includes('upgrade') || normalizedMessage.includes('downgrade')) {
      return knowledgeBase["change subscription"];
    } else if (normalizedMessage.includes('location') || normalizedMessage.includes('where')) {
      return knowledgeBase.locations;
    } else if (normalizedMessage.includes('validity') || normalizedMessage.includes('expire') || normalizedMessage.includes('duration')) {
      return knowledgeBase.validity;
    } else if (normalizedMessage.includes('corporate') || normalizedMessage.includes('business') || normalizedMessage.includes('company')) {
      return knowledgeBase["corporate plans"];
    } else {
      return knowledgeBase.default;
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');

    // Simulate bot thinking with a slight delay
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: generateResponse(userMessage.text),
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat toggle button */}
      <Button
        onClick={handleToggleChat}
        className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          {/* Chat header */}
          <div className="bg-primary text-white p-4">
            <h3 className="font-medium">Subscription Assistant</h3>
            <p className="text-xs opacity-75">Ask about payments & subscriptions</p>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-[10px] mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="border-t border-gray-200 p-3 flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question here..."
              className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              onClick={handleSendMessage}
              className="rounded-l-none"
              aria-label="Send message"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
