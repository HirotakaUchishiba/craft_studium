import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Collapse, Button, Container } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function SelfIntroduction() {
  const location = useLocation();
  const { quizzes } = location.state || { quizzes: [] };
  const [openItems, setOpenItems] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleToggle = (index) => {
    setOpenItems(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleAnswerClick = (quizIndex, answerIndex) => {
    setSelectedAnswers(prevState => {
      const newState = { ...prevState };
      if (newState[quizIndex] === answerIndex) {
        // 同じボタンを押した場合、選択を解除
        delete newState[quizIndex];
      } else {
        // 新しいボタンを押した場合、選択を更新
        newState[quizIndex] = answerIndex;
      }
      return newState;
    });
  };

  const getButtonColor = (quizIndex, answerIndex, correctAnswer) => {
    if (selectedAnswers[quizIndex] === undefined) return 'default';
    if (selectedAnswers[quizIndex] === answerIndex) {
      if (answerIndex === correctAnswer) return 'success';
      return 'error';
    }
    return 'default';
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>自己紹介</Typography>
      <List>
        {quizzes.map((quiz, index) => (
          <React.Fragment key={index}>
            <ListItem button onClick={() => handleToggle(index)}>
              <ListItemText primary={quiz.question} />
              {openItems[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {quiz.answers.map((answer, ansIndex) => (
                  <ListItem key={ansIndex} sx={{ pl: 4 }}>
                    <Button
                      variant="contained"
                      color={getButtonColor(index, ansIndex, quiz.correctAnswer)}
                      onClick={() => handleAnswerClick(index, ansIndex)}
                      fullWidth
                    >
                      {answer}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
}

export default SelfIntroduction;