const prisma = require('../config/prisma');

// Mock plan pricing and duration
const plans = {
  FREE: { duration: 30, price: 0 },
  PRO: { duration: 30, price: 10 }, // $10 for 30 days
  ENTERPRISE: { duration: 30, price: 50 } // $50 for 30 days
};

// Subscribe to a plan
exports.subscribePlan = async (req, res) => {
  const { plan } = req.body;
  const { userId } = req.user;

  if (!plans[plan]) return res.status(400).json({ error: 'Invalid plan selected.' });

  const { duration, price } = plans[plan];

  try {
    // Mock payment logic (just approve)
    console.log(`User ${userId} charged $${price} for ${plan} plan.`);

    // Set start and end dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + duration);

    // Upsert subscription
    const subscription = await prisma.subscription.upsert({
      where: { userId },
      update: { plan, startDate, endDate, status: 'ACTIVE' },
      create: { userId, plan, startDate, endDate, status: 'ACTIVE' }
    });

    res.json({ message: `Successfully subscribed to ${plan} plan.`, subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to subscribe.' });
  }
};

// View current subscription
exports.getSubscription = async (req, res) => {
  const { userId } = req.user;

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId }
    });

    res.json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch subscription.' });
  }
};

// Cancel subscription
exports.cancelSubscription = async (req, res) => {
  const { userId } = req.user;

  try {
    const subscription = await prisma.subscription.update({
      where: { userId },
      data: { status: 'CANCELLED' }
    });

    res.json({ message: 'Subscription cancelled.', subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cancel subscription.' });
  }
};
