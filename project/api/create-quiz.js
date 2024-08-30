let quizzes = [];

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { user, quizzes: newQuizzes } = req.body;
      quizzes.push({ user, quizzes: newQuizzes });
      res.status(200).json({ message: 'Quiz created successfully' });
    } catch (error) {
      console.error('Error creating quiz:', error);
      res.status(500).json({ error: 'Failed to create quiz' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};