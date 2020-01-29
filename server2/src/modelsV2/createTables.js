import query from '../db/index';

const createTableUsers = `CREATE TABLE IF NOT EXISTS 
        Users(
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(25) NOT NULL,
        lastName VARCHAR(25) NOT NULL,
        email VARCHAR(25) NOT NULL,
        address VARCHAR(25) NOT NULL,
        phoneNumber VARCHAR(25) NOT NULL,
        password VARCHAR(100) NOT NULL,
        isAdmin BOOLEAN NOT NULL

    )`;

const createTableAnnouncements = `CREATE TABLE IF NOT EXISTS 
        Announcements(
        id SERIAL PRIMARY KEY,
        text VARCHAR(25) NOT NULL,
        owner INTEGER REFERENCES Users(id),
        status VARCHAR(25),
        startDate TIMESTAMP,
        endDate TIMESTAMP

    )`;
const create = async () => {
  const tables = `${createTableUsers};${createTableAnnouncements}`;
  await query.query2(tables);
};
create();

export default create;
