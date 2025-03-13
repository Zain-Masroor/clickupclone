const prisma = require('../config/prisma');

// 📜 Get Current Subscription
exports.getSubscription = async (req, res) => {
  const { userId } = req.user;

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return res.json({ plan: 'FREE', isActive: true });
    }

    res.json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch subscription.' });
  }
};

// 💳 Mock Subscribe to Plan
exports.subscribePlan = async (req, res) => {
  const { userId } = req.user;
  const { plan } = req.body; // 'FREE', 'PRO', 'ENTERPRISE'

  if (!['FREE', 'PRO', 'ENTERPRISE'].includes(plan)) {
    return res.status(400).json({ error: 'Invalid plan selected.' });
  }

  try {
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (existingSubscription) {
      // Update plan
      await prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: { plan, startDate: new Date(), isActive: true },
      });
    } else {
      // Create new subscription
      await prisma.subscription.create({
        data: {
          user: { connect: { id: userId } },
          plan,
          startDate: new Date(),
          isActive: true,
        },
      });
    }

    res.json({ message: `Subscribed to ${plan} plan successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Subscription failed.' });
  }
};

// 🚫 Cancel Subscription
exports.cancelSubscription = async (req, res) => {
  const { userId } = req.user;

  try {
    await prisma.subscription.updateMany({
      where: { userId },
      data: { isActive: false, endDate: new Date() },
    });

    res.json({ message: 'Subscription canceled.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cancel subscription.' });
  }
};
