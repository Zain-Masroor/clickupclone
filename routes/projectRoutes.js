const express = require('express');
const { createProject, getProjects } = require('../controllers/projectController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Fix import path
const { checkPlanLimit } = require('../middlewares/planLimit'); // if using plan-based restriction

const router = express.Router();

// Create Project (Protected & Plan Limited)
router.post('/create', verifyToken, checkPlanLimit('project'), createProject);

// Get All Projects (Protected)
router.get('/', verifyToken, getProjects);

module.exports = router;
