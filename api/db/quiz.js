const pool = require('./index');

const insertAnswer = (quizId, correct) => ({ category, text }) =>
  pool.query(
    'INSERT INTO "Answer" (quiz_id, category, text, correct) VALUES($1, $2, $3, $4)',
    [quizId, category, text, correct]
  );

const insertNewQuiz = async (
  uid,
  { mode, answers: { correct, incorrect } }
) => {
  const {
    rows: [quiz],
  } = await pool.query(
    'INSERT INTO "Quiz" (user_id, mode) VALUES($1, $2) RETURNING id',
    [uid, mode]
  );

  await Promise.all([
    Promise.all(correct.map(insertAnswer(quiz.id, true))),
    Promise.all(incorrect.map(insertAnswer(quiz.id, false))),
  ]);
};

const getAll = async () => {
  const val = await pool.query('SELECT * FROM "Quiz";', []);
  return val.rows;
};

const getStatsByID = async (quizID) => {
  const val = await pool.query('SELECT * FROM "Answer" WHERE quiz_id = $1', [
    quizID,
  ]);
  return val.rows;
};

module.exports = {
  insertNewQuiz,
  getAll,
  getStatsByID,
};
