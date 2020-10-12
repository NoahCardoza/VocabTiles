const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const { QuizSchema } = require('../schema/quiz');
const dbUser = require('../db/user');
const dbQuiz = require('../db/quiz');

const router = express.Router();

router.post('/quiz', validator.query(QuizSchema), async (req, res) => {
  try {
    const quizId = await dbQuiz.insertNewQuiz(await req.user.id, req.body);
    res.status(201).send({ id: quizId });
  } catch (e) {
    return res.status(422).send();
  }
});

router.get('/quiz/:id', async (req, res) => {
  try {
    res.json(
      await dbUser.getQuizStatsByID(req.user.id, parseInt(req.params.id))
    );
  } catch (err) {
    if (err.status !== undefined) {
      return res.status(err.status).json(err.msg);
    }
    console.log(err);
    return res.status(422).json({ msg: err });
  }
});

router.get('/stats', async (req, res) => {
  try {
    res.json(await dbUser.getUserStats(req.user.id));
  } catch (e) {
    console.error(e);
    res.status(400).json({
      msg: e,
    });
  }
});

module.exports = router;
