const prisma = require('../config/prisma');

// 🧠 AI Task Recommendations (simple rule-based)
exports.recommendTasks = async (req, res) => {
  const { userId } = req.user; // From JWT

  try {
    // Fetch recent tasks by this user
    const userTasks = await prisma.task.findMany({
      where: { assignedTo: userId },
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    // Extract keywords from recent tasks
    const keywords = userTasks.map(t => t.title.split(' ')).flat();

    // Recommend other tasks from system with similar keywords
    const recommendedTasks = await prisma.task.findMany({
      where: {
        OR: keywords.map(word => ({
          title: { contains: word, mode: 'insensitive' }
        }))
      },
      take: 5
    });

    res.json({ recommendations: recommendedTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch recommendations.' });
  }
};
