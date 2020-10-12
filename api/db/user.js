const R = require('ramda');
const pool = require('./index');

const getAllUserQuizzes = async (uID) => {
  const quizIds = await pool.query(
    'SELECT id, mode FROM "Quiz" WHERE user_id = $1 ORDER BY id',
    [uID]
  );

  const allQuizzes = await Promise.all(
    quizIds.rows.map(({
      id,
      mode
    }) => getUserQuizByID(uID, id, mode))
  );

  return allQuizzes;
};

const uniqByCategoryID = R.uniqBy(R.prop('category_id'))
const transformCategory = R.pick(['category_id', 'type', 'title', 'slug'])

const getUserQuizByID = async (userID, quizID) => {
  const {
    rows: [quiz],
  } = await pool.query(
    'SELECT id, mode FROM "Quiz" WHERE id = $1 AND user_id = $2',
    [quizID, userID]
  );

  if (!quiz) {
    return null;
  }

  const {
    rows: answers
  } = await pool.query(
    `SELECT A.id AS answer_id, A.index, correct, C.id AS category_id, C.type, C.title, C.slug, Q.audio, Q.text, Q.color, Q.image FROM "Answer" A
      INNER JOIN "Question" Q on A.question_id = Q.id
      INNER JOIN "Category" C on Q.category_id = C.id
      WHERE quiz_id = $1
      ORDER BY A.index`,
    [quiz.id]
  );

  const categories = uniqByCategoryID(answers.map(transformCategory));

  return {
    id: quiz.id,
    mode: quiz.mode,
    categories,
    answers,
  };
};


// const getUserHomePageInfo = (userID) => getAllUserQuizzes(userID)
//   .then(R.map(({ id, mode, categories }) => ( {
//     const answer_count = {
//       correct: 0,
//       total: 0,
//     };


//     return {
//       id,
//       mode,
//       categories: categories.map(R.pick(['category_id', 'title', 'slug'])),
//     };
//   })));


const getUserHomePageInfo = async (userID) => {
  const allQuizzesUnfiltered = await getAllUserQuizzes(userID);
  return allQuizzesUnfiltered.map((quizData) => ({
    id: quizData.id,
    mode: quizData.mode,
    categories: quizData.categories.map(R.pick(['category_id', 'title', 'slug'])),
    correct: quizData.answers.filter((answer) => answer.correct).length,
    total: quizData.answers.length,
  }));
};


module.exports = {
  getUserQuizByID,
  getAllUserQuizzes,
  getUserHomePageInfo,
};
