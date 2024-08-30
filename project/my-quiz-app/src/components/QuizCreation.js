import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, Typography, Card, CardContent, Container } from '@mui/material';

function QuizCreation({ user }) {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState({ question: '', answers: ['', '', ''], correctAnswer: null });
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  const handleQuestionChange = (e) => {
    setCurrentQuiz({ ...currentQuiz, question: e.target.value });
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...currentQuiz.answers];
    newAnswers[index] = value;
    setCurrentQuiz({ ...currentQuiz, answers: newAnswers });
  };

  const handleCorrectAnswerChange = (index) => {
    setCurrentQuiz({ ...currentQuiz, correctAnswer: index });
  };

  const addOrUpdateQuiz = () => {
    if (currentQuiz.question && currentQuiz.answers.every(answer => answer) && currentQuiz.correctAnswer !== null) {
      if (editingIndex !== null) {
        // 編集モード
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[editingIndex] = currentQuiz;
        setQuizzes(updatedQuizzes);
        setEditingIndex(null);
      } else if (quizzes.length < 3) {
        // 新規追加モード
        setQuizzes([...quizzes, currentQuiz]);
      }
      setCurrentQuiz({ question: '', answers: ['', '', ''], correctAnswer: null });
    } else {
      alert('全ての項目を入力してください。');
    }
  };

  const editQuiz = (index) => {
    setCurrentQuiz(quizzes[index]);
    setEditingIndex(index);
  };

  const isComplete = quizzes.length === 3;
  const handleComplete = async () => {
    try {
      const response = await fetch('/api/create-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, quizzes }),
      });
      navigate('/self-introduction', { state: { quizzes } });
    } catch (error) {
      // ... エラーハンドリング
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>クイズ作成 ({quizzes.length}/3)</Typography>
      <Card>
        <CardContent>
          <TextField
            fullWidth
            label="問題文"
            variant="outlined"
            value={currentQuiz.question}
            onChange={handleQuestionChange}
            margin="normal"
          />
          {currentQuiz.answers.map((answer, index) => (
            <div key={index}>
              <TextField
                fullWidth
                label={`解答 ${index + 1}`}
                variant="outlined"
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                margin="normal"
              />
              <RadioGroup value={currentQuiz.correctAnswer} onChange={() => handleCorrectAnswerChange(index)}>
                <FormControlLabel value={index} control={<Radio />} label="正解" />
              </RadioGroup>
            </div>
          ))}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={addOrUpdateQuiz}
            fullWidth
          >
            {editingIndex !== null ? '更新' : '追加'}
          </Button>
        </CardContent>
      </Card>
      
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>作成されたクイズ一覧</Typography>
      {quizzes.map((quiz, index) => (
        <Card key={index} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">問題: {quiz.question}</Typography>
            {quiz.answers.map((answer, ansIndex) => (
              <Typography key={ansIndex}>
                {answer} {quiz.correctAnswer === ansIndex ? '(正解)' : ''}
              </Typography>
            ))}
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => editQuiz(index)}
              style={{ marginTop: '10px' }}
            >
              編集
            </Button>
          </CardContent>
        </Card>
      ))}

      {isComplete && (
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleComplete} 
          fullWidth
          style={{ marginTop: '20px' }}
        >
          完成
        </Button>
      )}
    </Container>
  );
}

export default QuizCreation;