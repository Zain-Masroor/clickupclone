const express = require('express');
const { moderateTask } = require('../controllers/aiController');
const { recommendTasks } = require('../controllers/aiRecommendationController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.use(verifyToken);

// AI moderation route
router.post('/moderate-task', moderateTask);

// AI recommendations route
router.get('/recommend-tasks', recommendTasks);

module.exports = router;
