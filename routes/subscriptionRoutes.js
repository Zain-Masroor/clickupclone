const express = require('express');
const {
  getSubscription,
  subscribePlan,
  cancelSubscription,
} = require('../controllers/subscriptionController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.use(verifyToken);

// Get current subscription
router.get('/', getSubscription);

// Subscribe to a plan
router.post('/subscribe', subscribePlan);

// Cancel subscription
router.post('/cancel', cancelSubscription);

module.exports = router;
