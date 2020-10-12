const pool = require('./index');

// eslint-disable-next-line camelcase
const insertAnswer = (quizId) => ({ category_id, correct }) =>
  pool.query(
    'INSERT INTO "Answer" (quiz_id, category_id, correct) VALUES($1, $2, $3)',
    // eslint-disable-next-line camelcase
    [quizId, category_id, correct]
  );

const insertNewQuiz = async (uid, { mode, answers }) => {
  const {
    rows: [quiz],
  } = await pool.query(
    'INSERT INTO "Quiz" (user_id, mode) VALUES($1, $2) RETURNING id',
    [uid, mode]
  );

  await Promise.all(answers.map(insertAnswer(quiz.id)));

  return quiz.id;
};

const getAll = async () => {
  const val = await pool.query('SELECT * FROM "Quiz";', []);
  return val.rows;
};

module.exports = {
  insertNewQuiz,
  getAll,
};
