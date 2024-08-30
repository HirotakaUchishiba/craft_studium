const express = require('express');
const cors = require('cors');
const createQuiz = require('./create-quiz');
const getQuiz = require('./get-quiz');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/create-quiz', createQuiz);
app.get('/api/get-quiz', getQuiz);

module.exports = app;