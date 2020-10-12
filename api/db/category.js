const pool = require('./index');

const getCatBySlug = async (slug) => {
  const cat = await pool.query('SELECT * FROM "Category" WHERE slug = $1', [slug]);
  return cat.rows[0];
};

module.exports = {
  getCatBySlug,
};
