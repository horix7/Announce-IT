
import bcrypt from 'bcrypt';
import query from '../db/index';

const createUser = async (user) => {
  const queryText = `INSERT INTO 
  Users(firstName,lastName,email,address,phoneNumber,password,isAdmin)
  VALUES($1,$2,$3,$4,$5,$6,$7)
  RETURNING *`;
  const userValue = [user.firstName, user.lastName || '-', user.email, user.address,
    user.phoneNumber || '-', bcrypt.hashSync(user.password, 10), user.isAdmin];
  const data = await query.query1(queryText, userValue);
  return data;
};
const userExist = async (email) => {
  const queryText = 'SELECT * FROM Users WHERE email=$1';
  const value = [email];
  const data = await query.query1(queryText, value);
  return data;
};
const isAdmin = async (email) => {
  const queryText = 'SELECT * FROM Users WHERE email=$1 and isAdmin=\'t\'';
  const value = [email];
  const data = await query.query1(queryText, value);
  return data;
};

export { createUser, userExist, isAdmin };
