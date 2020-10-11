const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: '127.0.0.1',
  database: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

module.exports = pool;
