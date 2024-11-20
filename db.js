const {Pool} = require("pg");

const pool = new Pool({
    host: 'localhost',
    user: 'shahin',
    port:5432,
    database:"bookdb"
  });

  module.exports = pool;