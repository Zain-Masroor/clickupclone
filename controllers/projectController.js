const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ Create a New Project
const createProject = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Create project in DB
        const project = await prisma.project.create({
            data: {
                title,
                description,
                userId: req.user.id, // User ID from JWT
            },
        });

        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create project', error });
    }
};

// ✅ Get All Projects of User
const getProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            where: { userId: req.user.id },
        });

        res.status(200).json({ projects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch projects', error });
    }
};

module.exports = {
    createProject,
    getProjects,
};
