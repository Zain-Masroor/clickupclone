const prisma = require('../config/prisma');

// ➕ Add to History
exports.addHistory = async (req, res) => {
  const { userId } = req.user;
  const { taskId, projectId, action } = req.body;

  if (!taskId && !projectId) {
    return res.status(400).json({ error: 'Task ID or Project ID is required.' });
  }

  try {
    const history = await prisma.history.create({
      data: { userId, taskId, projectId, action },
    });
    res.json({ message: 'History recorded.', history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add to history.' });
  }
};

// 📜 Get User History
exports.getHistory = async (req, res) => {
  const { userId } = req.user;

  try {
    const history = await prisma.history.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20, // Latest 20 actions
      include: {
        task: true,
        project: true,
      },
    });
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch history.' });
  }
};
