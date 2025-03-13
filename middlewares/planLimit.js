// middlewares/planLimit.js

const checkPlanLimit = (type) => (req, res, next) => {
  // Logic to check plan limit
  next(); // Call next() if allowed
};

module.exports = { checkPlanLimit }; // ✅ Correct export
