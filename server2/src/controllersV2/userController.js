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
    .encodeToken({ email: user.rows[0].email, isAdmin: user.rows[0].isAdmin, id: user.rows[0].id });
  if (user.rowCount > 0) {
    return res.status(201).json({
      status: 'success',
      data: {
        tokem: token,
        data: user.rows[0],
      },
    });
  }
  return res.status(500).json({
    status: 'error',
    error: 'user not created',
  });
};


export default signup;
