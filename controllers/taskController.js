// controllers/taskController.js

const openai = require('../services/aiService');

// ✅ Correct function definition
const createTask = async (req, res) => {
  try {
    const { description } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Summarize this task: ${description}` },
      ],
    });

    const aiResponse = response.choices[0].message.content;

    res.json({ summary: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating task summary' });
  }
};

const getTasks = async (req, res) => {
  try {
    res.json([{ id: 1, title: "Test Task", description: "This is a test task" }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// ✅ Correct export
module.exports = { createTask, getTasks };
