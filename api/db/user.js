const slugify = require('../../utils/_toSlug');
const asyncForEach = require('../../utils/asyncForEach');
const pool = require('./index');

const selectUserFromFirebaseId = async (firebaseId) => {
  const {
    rows,
  } = await pool.query('SELECT (id) FROM "User" WHERE firebase_id = $1', [
    firebaseId,
  ]);

  return (rows[0] && rows[0].id) || null;
};

const getAllUsers = async () => {
  const res = await pool.query('SELECT * FROM "User;', []);
  return res.rows;
};

const getUserStats = async (fbID) => {
  let quizzesTaken = await pool.query(
    'SELECT id, mode FROM "Quiz" WHERE user_id = $1',
    [fbID]
  );

  quizzesTaken = quizzesTaken.rows;

  const createEmptyCategoryObj = () => {
    return {
      title: '',
      slug: '',
      mode: 0,
      total: 0,
      correct: 0,
    };
  };
  const categories = [];
  for (let i = 0; i < quizzesTaken.length; ++i) {
    categories.push(createEmptyCategoryObj());
  }

  const correctArr = [];
  const incorrectArr = [];

  console.log(categories);
  console.log(quizzesTaken.length);

  await asyncForEach(quizzesTaken, async (quiz, index) => {
    let answers = await pool.query(
      'SELECT * FROM "Answer" WHERE quiz_id = $1;',
      [quiz.id]
    );
    answers = answers.rows;

    categories[index].title = answers[0].category;
    categories[index].slug = slugify(answers[0].category);
    categories[index].mode = quiz.mode;

    for (const ans of answers) {
      categories[index].total += 1;
      const { quiz_id, correct, ...ansData } = ans;
      if (correct) {
        categories[index].correct += 1;
        correctArr.push(ansData);
      } else {
        incorrectArr.push(ansData);
      }
    }
  });

  return {
    categories,
    correct: correctArr,
    incorrect: incorrectArr,
  };
};

const insertUser = async (newUser) => {
  const { id, username, firebade_id, literacy_level } = newUser;
  await pool.query(
    'INSERT INTO "User" (id, username, firebase_id, literacy_level) VALUES($1, $2, $3, $4)',
    [id, username, firebade_id, literacy_level]
  );
};

module.exports = {
  getAllUsers,
  selectUserFromFirebaseId,
  getUserStats,
  insertUser,
};
