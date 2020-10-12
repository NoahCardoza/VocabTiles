const slugify = require('../../utils/_toSlug');
const collect = require('../../utils/collect');
const pool = require('./index');

const getUserStats = async (fbID) => {
  const quizIds = await pool.query(
    'SELECT id, mode FROM "Quiz" WHERE user_id = $1 ORDER BY id',
    [fbID]
  );

  const allQuizzes = await Promise.all(
    quizIds.rows.map(({ id, mode }) => getQuizStatsByID(fbID, id, mode))
  );

  return allQuizzes;
};

const getQuizStatsByID = async (userID, quizID, modeProvided) => {
  const createEmptyCategoryObject = (title) => {
    return { title, slug: slugify(title), total: 0, correct: 0 };
  };

  const belongsToUser = (await pool.query('SELECT id FROM "Quiz" WHERE id = $1 AND user_id = $2', [quizID, userID])).rows.length !== 0;

  if (belongsToUser) {
    let mode;
    if (modeProvided === undefined) {
      mode = (await pool.query('SELECT mode from "Quiz" WHERE id = $1', [quizID]))
        .rows[0].mode;
    } else {
      mode = modeProvided;
    }

    const val = await pool.query(
      'SELECT * FROM "Answer" WHERE quiz_id = $1 ORDER BY id',
      [quizID]
    );
    const allAnswers = val.rows;

    const encounteredCategories = new Map();
    const answers = [];
    allAnswers.forEach((ans) => {
      const { id, category, text, correct } = ans;

      if (!encounteredCategories.has(category)) {
        encounteredCategories.set(category, createEmptyCategoryObject(category));
      }

      encounteredCategories.get(category).total += 1;
      if (correct) {
        encounteredCategories.get(category).correct += 1;
      }

      answers.push({ id, category, text, correct });
    });

    return {
      id: quizID,
      mode,
      categories: collect(encounteredCategories.values()),
      answers,
    };
  } else {
    throw new Error({status: 403, msg: {msg: "Unauthorized Quiz Access, quiz does not belong this user"}});
  }
};


const getAllUsers = async () => {
  const res = await pool.query('SELECT * FROM "User;', []);
  return res.rows;
};

module.exports = {
  getAllUsers,
  getUserStats,
  getQuizStatsByID,
};
