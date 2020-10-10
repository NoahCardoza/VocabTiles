const express = require('express');
const router = express.Router();
const db = require('../DBrouters/dbRouter');
const verifyJSON = require('../schema/verifyJSON');

router.use(express.json());

router.get('/', (_req, res) => {
  // console.log('GET quizzes request');
  res.json(db.getAllQuizzes());
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(`GET quizzes request with id ${id}`);
  const data = db.getOneQuizByID(id);
  if (data.length === 0) {
    res.status(400).json({ msg: `No user with is ${id}` });
  } else {
    res.json();
  }
});

router.get('/:id/scores', (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(`GET scores for quiz ${id}`);
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

router.post('/', (req, res) => {
  const newQuiz = req.body;
  // console.log(
  //   `POST new quiz with id ${newQuiz.id} and name ${newQuiz.name} and difficulty ${newQuiz.difficulty}`
  // );
  if (verifyJSON('quizzes', newQuiz)) {
    res.json(db.addQuiz(newQuiz));
  } else {
    res.status(400).json({ msg: `sent data does not match schema` });
  }
});

router.put('/:id', (req, res) => {
  const updatedQuiz = req.body;
  // console.log(`PUT request to update quiz id ${updatedQuiz.id}`);
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
