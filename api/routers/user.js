const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const { handleAPIError } = require('../APIError');
const { QuizSchema } = require('../schema/quiz');
const { getUserQuizByID, getAllUserQuizzes } = require('../db/user');
const { insertNewQuiz } = require('../db/quiz');

const router = express.Router();

router.post('/quiz', validator.query(QuizSchema), async (req, res) => {
  try {
    const id = await insertNewQuiz(await req.user.id, req.body);
    res.status(201).send({ id });
  } catch (e) {
    handleAPIError(res, e);
  }
});

router.get('/quiz/:id', async (req, res) => {
  try {
    const quiz = await getUserQuizByID(req.user.id, parseInt(req.params.id));

    if (!quiz) {
      return res.status(400).json({
        message: 'This quiz does not exist for this user.',
      });
    }

    res.json(quiz);
  } catch (e) {
    handleAPIError(res, e);
  }
});

router.get('/stats', async (req, res) => {
  try {
    res.json(await getAllUserQuizzes(req.user.id));
  } catch (e) {
    handleAPIError(res, e);
  }
});

module.exports = router;
