
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const tokenHelper = {
  encodeToken(payload) {
    const token = jwt.sign(payload, process.env.PRIVATE_KEY);
    return token;
  },

  decodeToken(token) {
    const data = jwt.verify(token, process.env.PRIVATE_KEY);
    return data;
  },
};

export default tokenHelper;
