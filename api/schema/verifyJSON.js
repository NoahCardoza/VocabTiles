// // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
// let _userDB, userSchema;
// ({ _userDB, userSchema } = require('./users'));
// // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
// let _quizzesDB, quizSchema;
// ({ _quizzesDB, quizSchema } = require('./quizzes'));
// // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
// const { _scoreDB, scoreSchema } = require('./quiz-scores');

const quizSchema = require('./quizzesSchema');
const userSchema = require('./usersSchema');
const scoreSchema = require('./quiz-scoresSchema');

function verifyJSON(desiredSchema, sent) {
  let schema = null;
  switch (desiredSchema) {
    case 'users':
      schema = userSchema;
      break;
    case 'quizzes':
      schema = quizSchema;
      break;
    case 'scores':
      schema = scoreSchema;
      break;
    default:
      throw new Error('Desired Schema does not exist');
  }
  Object.keys(schema).forEach((key) => {
    const typeStr = typeof sent[key];
    if (sent[key] === undefined || !typeStr === schema[key]) {
      return false;
    }
  });
  return true;
}

module.exports = verifyJSON;
