const express = require('express');
const db = require('../DBrouters/dbRouter');
const verifyJSON = require('../_schema/verifyJSON');
const { QuizSchema } = require('../schema/quiz');

const router = express.Router();

router.put('/', async (req, res) => {
  try {
    const quiz = await QuizSchema.validateAsync(req.body);
    db.addQuiz(quiz);
  } catch (e) {
    return res.status(422).send();
  }
  res.status(201).send();
});

router.get('/', (_req, res) => {
  res.json(db.getAllQuizzes());
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = db.getOneQuizByID(id);
  if (data.length === 0) {
    res.status(400).json({ msg: `No user with is ${id}` });
  } else {
    res.json();
  }
});

router.get('/:id/scores', (req, res) => {
  const id = parseInt(req.params.id);
  const data = db.getScoresByQuiz(id);
  if (data.length === 0) {
    if (db.getOneQuizByID(id).some((quiz) => quiz.id === id)) {
      res.json(data);
    } else {
      res.status(400).json({ msg: `No quiz with id ${id}` });
    }
  } else {
    res.json(data);
  }
});

router.put('/:id', (req, res) => {
  const updatedQuiz = req.body;
  if (verifyJSON('quizzes', updatedQuiz)) {
    if (parseInt(req.params.id) === updatedQuiz.id) {
      res.json(db.updateQuiz(updatedQuiz));
    } else {
      res.status(400).json({
        msg: `URI ID (${req.params.id}) and sent ID (${updatedQuiz.id}) do not match`,
      });
    }
  } else {
    res.status(400).json({ msg: `sent data does not match schema` });
  }
});
module.exports = router;
