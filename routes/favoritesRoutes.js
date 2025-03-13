const express = require('express');
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require('../controllers/favoritesController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.use(verifyToken);

router.post('/add', addFavorite);
router.delete('/remove/:id', removeFavorite);
router.get('/', getFavorites);

module.exports = router;
