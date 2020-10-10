const pool = require('./index');

const selectUserFromFirebaseId = async (firebaseId) => {
  const {
    rows,
  } = await pool.query('SELECT (id) FROM "User" WHERE firebase_id = $1', [
    firebaseId,
  ]);

  return (rows[0] && rows[0].id) || null;
};

module.exports = {
  selectUserFromFirebaseId,
};
