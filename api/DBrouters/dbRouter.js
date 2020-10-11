const quizDB = require('../db/quiz');
const { QuizSchema } = require('../schema/quiz');
const UserSchema = require('../schema/users');
const userDB = require('../db/user');

const dbRouter = {
  // GETs
  getAllQuizzes: () => {
    return quizDB.getAll();
  },

  getAllUsers: () => {
    return userDB.getAllUsers();
  },

  getQuizStats: (quizID) => {
    return quizDB.getStatsByID(quizID);
  },

  getUserByID: (fbID) => {
    return userDB.selectUserFromFirebaseId(fbID);
  },

  getUserStatsByID: (fbID) => {
    return userDB.getUserStats(fbID);
  },

  // POSTs
  insertNewUser: (userObj) => {
    const { value, err } = UserSchema.validate(userObj);
    if (err) {
      throw new Error("Supplied JSON doesn't match required schema");
    } else {
      userDB.insertUser(value);
    }
  },

  // PUTs


};

module.exports = dbRouter;
