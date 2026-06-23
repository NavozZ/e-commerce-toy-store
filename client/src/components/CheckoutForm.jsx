import React, { useState } from "react";
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
        return_url: window.location.origin, 
      },
      redirect: "if_required", 
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment Successful! 🎉");
      onSuccess(paymentIntent.id); 
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
      <h3 className="font-bold text-xl mb-4">Pay securely with Card 💳</h3>
      <PaymentElement id="payment-element" />
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="w-full bg-primary text-white font-bold py-4 rounded-full mt-6 hover:bg-primary-hover transition-all disabled:bg-gray-300 cursor-pointer"
      >
        {isLoading ? "Processing..." : `Pay $${amount}`}
      </button>
      {message && <div id="payment-message" className="mt-4 text-center text-sm font-bold text-primary">{message}</div>}
    </form>
  );
};

export default CheckoutForm;