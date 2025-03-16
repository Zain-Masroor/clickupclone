const prisma = require('../config/prisma');
const { io } = require('../app');

// Add comment to task
exports.addComment = async (req, res) => {
  const { taskId, content } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        taskId,
        authorId: req.user.userId
      }
    });
    res.json({ message: 'Comment added', comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add comment and handle mentions
exports.addComment = async (req, res) => {
  const { userId } = req.user;
  const { content, taskId, projectId } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: { userId, content, taskId, projectId },
      include: { user: true },
    });

    // Extract mentions (e.g., @john)
    const mentions = content.match(/@(\w+)/g)?.map(m => m.slice(1)) || [];

    // Notify mentioned users
    for (const username of mentions) {
      const mentionedUser = await prisma.user.findUnique({ where: { name: username } });
      if (mentionedUser) {
        const notification = await prisma.notification.create({
          data: { userId: mentionedUser.id, message: `You were mentioned in a comment.` },
        });

        // Emit notification via socket.io
        io.to(mentionedUser.id).emit('newNotification', notification);
      }
    }

    // Emit real-time comment to the task/project room
    const roomId = taskId || projectId;
    io.to(roomId).emit('newComment', comment);

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add comment.' });
  }
};

// Get all comments for a task
exports.getComments = async (req, res) => {
  const { taskId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { taskId },
      include: { author: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'asc' }
    });
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

