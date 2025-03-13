const prisma = require('../config/prisma');

// ⭐ Add to Favorites
exports.addFavorite = async (req, res) => {
  const { userId } = req.user;
  const { taskId, projectId } = req.body;

  if (!taskId && !projectId) {
    return res.status(400).json({ error: 'Task ID or Project ID is required.' });
  }

  try {
    const favorite = await prisma.favorite.create({
      data: { userId, taskId, projectId },
    });
    res.json({ message: 'Added to favorites.', favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add favorite.' });
  }
};

// ❌ Remove from Favorites
exports.removeFavorite = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    await prisma.favorite.deleteMany({
      where: { id, userId },
    });
    res.json({ message: 'Removed from favorites.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove favorite.' });
  }
};

// 📜 Get User Favorites
exports.getFavorites = async (req, res) => {
  const { userId } = req.user;

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        task: true,
        project: true,
      },
    });
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch favorites.' });
  }
};
