const express = require('express');
const db = require('../DBrouters/dbRouter');
const { QuizSchema } = require('../schema/quiz');
const { insertNewQuiz } = require('../db/quiz');

const router = express.Router();

router.put('/', async (req, res) => {
  try {
    const quiz = await QuizSchema.validateAsync(req.body);
    insertNewQuiz(await req.user.id(), quiz);
  } catch (e) {
    return res.status(422).send();
  }
  res.status(201).send();
});

router.get('/', async (_req, res) => {
  try {
    res.send(await db.getAllQuizzes());
  } catch {
    res.status(400).json({ msg: `Error` });
  }
});

router.get('/answers/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    res.send(await db.getQuizStats(id));
  } catch {
    res.status(400).json({ msg: `Error` });
  }
});

module.exports = router;
