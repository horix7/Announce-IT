import bcrypt from 'bcrypt';
import { createUser, userExist } from '../modelsV2/user';
import tokenHelper from '../helpers/token';

const signup = async (req, res) => {
  const userExists = await userExist(req.body.email);
  if (req.body.password !== req.body.confirm) {
    return res.status(403).json({
      status: 'error',
      error: 'Password must match Confirm',
    });
  }

  if (userExists.rowCount > 0) {
    return res.status(403).json({
      status: 'error',
      error: 'User exists',
    });
  }
  const user = await createUser(req.body);
  const token = tokenHelper
    .encodeToken({
      email: user.rows[0].email,
      isAdmin: user.rows[0].isAdmin,
      id: user.rows[0].id,
    });
  return res.status(201).json({
    status: 'success',
    data: {
      dataToken: token,
      data: user.rows[0],
    },
  });
};
const login = async (req, res) => {
  const userLogin = await userExist(req.body.email);
  if (userLogin.rowCount === 0) {
    return res.status(403).json({
      status: 'error',
      error: 'user does not exist',
    });
  }
  if (bcrypt.compareSync(req.body.password, userLogin.rows[0].password)) {
    const token = tokenHelper
      .encodeToken(
        {
          email: userLogin.rows[0].email,
          isAdmin: userLogin.rows[0].isAdmin,
          id: userLogin.rows[0].id,
        },
      );
    return res.status(200).json({
      status: 'success',
      data: {
        dataToken: token,
        data: userLogin.rows[0],
      },
    });
  }
  return res.status(403).json({
    status: 'error',
    error: 'Wrong password',
  });
};


export { signup, login };
