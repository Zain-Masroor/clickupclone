// middlewares/auth.js

const verifyToken = (req, res, next) => {
  // Token verification logic here
  next(); // Call next() to move to the next middleware/controller
};

module.exports = { verifyToken }; // ✅ Correct export
