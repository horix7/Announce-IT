import dotenv from 'dotenv';

dotenv.config();
export default {
  development: {
    databaseUrl: process.env.DEV_DB_URL,
  },
  test: {
    databaseUrl: process.env.TEST_DB_URL,
  },
};
