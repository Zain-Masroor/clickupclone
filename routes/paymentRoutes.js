const express = require('express');
const { subscribePlan, getSubscription, cancelSubscription } = require('../controllers/paymentController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.use(verifyToken);

router.post('/subscribe', subscribePlan);
router.get('/current', getSubscription);
router.post('/cancel', cancelSubscription);

module.exports = router;
