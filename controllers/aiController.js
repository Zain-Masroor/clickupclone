const openai = require('../config/openai'); // If using OpenAI API

// 🧠 AI Task Moderation
exports.moderateTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    // --------- Option 1: Rule-based AI ---------
    if (!description || description.length < 15) {
      return res.json({ approved: false, reason: 'Task description is too short or empty.' });
    }
    const forbiddenWords = ['badword', 'inappropriate'];
    for (const word of forbiddenWords) {
      if (description.includes(word)) {
        return res.json({ approved: false, reason: 'Inappropriate content detected.' });
      }
    }
    // Approve if passed
    return res.json({ approved: true, reason: 'Task approved.' });

    // --------- Option 2: OpenAI AI Model ---------
    // Uncomment to use real AI model instead
    /*
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an assistant that moderates task descriptions." },
        { role: "user", content: `Task: ${description}. Should this task be approved?` },
      ],
    });
    const answer = response.data.choices[0].message.content;
    const approved = answer.toLowerCase().includes('yes');
    return res.json({ approved, reason: answer });
    */
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI moderation failed.' });
  }
};
