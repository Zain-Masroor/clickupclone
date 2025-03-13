const express = require('express');
const { getNotifications, markAsSeen } = require('../controllers/notificationController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.use(verifyToken);
router.get('/', getNotifications);
router.put('/seen/:id', markAsSeen);

module.exports = router;
