const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const { verifyToken } = require('../middlewares/auth');
const { checkPlanLimit } = require('../middlewares/planLimit');

console.log("createTask =>", createTask);
console.log("getTasks =>", getTasks);
console.log("verifyToken =>", verifyToken); // ✅ Check if defined
console.log("checkPlanLimit =>", checkPlanLimit); // ✅ Check if defined

const router = express.Router();

// Routes
router.post('/create', verifyToken, checkPlanLimit('task'), createTask);
router.get('/', verifyToken, getTasks);

module.exports = router;
