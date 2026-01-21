const Stripe = require('stripe');

// @desc    Create Payment Intent
// @route   POST /api/payment/create-payment-intent
exports.createPaymentIntent = async (req, res) => {
  // 1. Initialize Stripe INSIDE the function (Lazy Loading)
  // This ensures dotenv has time to load the key first.
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Ensure it's an integer (cents)
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};