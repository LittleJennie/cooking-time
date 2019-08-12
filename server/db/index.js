const { Pool } = require('pg');

const pool = new Pool({
  user: 'jenniezeng',
  host: 'localhost',
  database: 'cooking_time',
  port: 5432,
});

module.exports = pool;
