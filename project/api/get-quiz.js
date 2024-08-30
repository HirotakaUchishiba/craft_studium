let quizzes = [];

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      res.status(200).json(quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};