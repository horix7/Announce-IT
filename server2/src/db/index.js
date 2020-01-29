/* eslint-disable no-console */
import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();
console.log('conectenv', process.env.NODE_ENV);
const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? config.test.databaseUrl : config.development.databaseUrl,
});

pool.on('connect', () => {
  console.log('well connected on', process.env.NODE_ENV);
});

const query = {
  query1: (text, value) => pool.query(text, value),
  query2: (queryText) => pool.query(queryText),
};

export default query;
