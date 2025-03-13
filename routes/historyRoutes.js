const express = require('express');
const {
  addHistory,
  getHistory,
} = require('../controllers/historyController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.use(verifyToken);

router.post('/add', addHistory);
router.get('/', getHistory);

module.exports = router;
