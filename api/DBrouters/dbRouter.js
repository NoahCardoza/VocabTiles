// const { Pool } = require('pg');
let userDB = {}; // require('../schema/usersDB');
let quizzesDB = {}; // require('../schema/quizzesDB');
let scoreDB = {}; // require('../schema/quiz-scoresDB');

const dbRouter = {
  // GETTERS
  getAllUsers() {
    return userDB;
  },

  getOneUserByID(id) {
    return userDB.filter((user) => {
      return user.id === id;
    });
  },

  getAllQuizzes() {
    return quizzesDB;
  },

  getOneQuizByID(id) {
    return quizzesDB.filter((quiz) => {
      return quiz.id === id;
    });
  },

  getScoresByUser(id) {
    return scoreDB.filter((score) => {
      return score.user_id === id;
    });
  },

  getScoresByQuiz(id) {
    return scoreDB.filter((score) => {
      return score.quiz_id === id;
    });
  },

  // POSTERS
  addUser(user) {
    userDB.push(user);
    // console.log(userDB);
    return user;
  },

  addQuiz(quiz) {
    quizzesDB.push(quiz);
    // console.log(quizzesDB);
    return quiz;
  },

  addScore(score) {
    scoreDB.push(score);
    // console.log(scoreDB);
    return score;
  },

  // PUTTERS
  updateUser(user) {
    userDB = userDB.filter((oldUser) => oldUser.id !== user.id).concat(user);
    // console.log(userDB);
    return user;
  },

  updateQuiz(quiz) {
    quizzesDB = quizzesDB
      .filter((oldQuiz) => oldQuiz.id !== quiz.id)
      .concat(quiz);
    // console.log(quizzesDB);
    return quiz;
  },

  updateScore(score) {
    scoreDB = scoreDB
      .filter(
        (oldScore) =>
          oldScore.user_id !== score.user_id &&
          oldScore.quiz_id !== score.quiz_id
      )
      .concat(score);
    // console.log(scoreDB);
    return score;
  },
};

module.exports = dbRouter;
