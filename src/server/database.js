const { Pool } = require('pg');
const process = require('process');
const dotenv = require('dotenv');

//this method adds dotenv variables to our process
dotenv.config();

// const PG_URI = process.env.PG_URI;
const PG_URI = 'postgres://vkwlvunh:is1f7C09a_tp7e6cuhWu9rhFAk_dvYhQ@mahmud.db.elephantsql.com/vkwlvunh'

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = pool;