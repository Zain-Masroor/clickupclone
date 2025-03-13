const prisma = require('../config/prisma');

// Fetch user's notifications
exports.getNotifications = async (req, res) => {
  const { userId } = req.user;

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
};

// Mark notification as seen
exports.markAsSeen = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await prisma.notification.update({
      where: { id },
      data: { seen: true },
    });
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to mark as seen.' });
  }
};
