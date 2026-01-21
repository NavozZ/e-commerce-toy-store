import React, { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL is not needed if we handle success inline, 
        // but Stripe requires redirect: 'if_required' for single-page apps usually.
        return_url: window.location.origin, 
      },
      redirect: "if_required", // Important to stop auto-redirect
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment Successful! 🎉");
      onSuccess(paymentIntent.id); // Call parent function to save order
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-xl mb-4">Pay securely with Card 💳</h3>
      <PaymentElement id="payment-element" />
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl mt-6 hover:bg-blue-700 transition-all disabled:bg-gray-300"
      >
        {isLoading ? "Processing..." : `Pay $${amount}`}
      </button>
      {message && <div id="payment-message" className="mt-4 text-center text-sm font-bold text-blue-600">{message}</div>}
    </form>
  );
};

export default CheckoutForm;