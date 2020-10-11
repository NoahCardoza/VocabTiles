const pool = require('./index');

const insertAnswer = (quizId) => ({ category, text, correct }) =>
  pool.query(
    'INSERT INTO "Answer" (quiz_id, category, text, correct) VALUES($1, $2, $3, $4)',
    [quizId, category, text, correct]
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
