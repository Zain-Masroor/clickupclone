const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.use(verifyToken);

router.post('/add', addComment);
router.get('/:taskId', getComments);

module.exports = router;
