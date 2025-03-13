const express = require('express');
const { recommendTasks } = require('../controllers/recommendationController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.use(verifyToken);
router.get('/tasks', recommendTasks);

module.exports = router;
