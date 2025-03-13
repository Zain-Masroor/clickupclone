const prisma = require('../config/prisma');

// Recommend tasks based on user history and priorities
exports.recommendTasks = async (req, res) => {
  const { userId } = req.user;

  try {
    // Fetch recent tasks and high-priority tasks
    const userTasks = await prisma.task.findMany({
      where: {
        OR: [
          { assignedToId: userId },
          { createdById: userId }
        ]
      },
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' }
      ],
      take: 5
    });

    // Fetch some global high-priority tasks
    const highPriorityTasks = await prisma.task.findMany({
      where: { priority: 'HIGH' },
      orderBy: { dueDate: 'asc' },
      take: 5
    });

    // Combine and remove duplicates
    const taskMap = {};
    [...userTasks, ...highPriorityTasks].forEach(task => {
      taskMap[task.id] = task;
    });

    const recommendations = Object.values(taskMap);

    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch recommendations.' });
  }
};
