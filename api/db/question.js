const pool = require('./index');

const getQuestionsByCategoryId = (catId) =>
  pool.query('SELECT id, audio, text, color, image FROM "Question" WHERE category_id = $1', [catId])
    .then(({ rows }) =>
      rows.map((row) => {
        if (row.color === null) {
          delete row['color'];
        }
        if (row.image === null) {
          delete row['image'];
        }
      })
    );

module.exports = {
  getQuestionsByCategoryId,
};
