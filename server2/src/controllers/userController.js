import userModel from '../models/user';

const userController = {

  createUser(req, res) {
    const user = userModel.createUser(req.body);
    if (user === 'user exists') {
      return res.status(403).json({
        status: 'error',
        error: 'That email has been used',
      });
    }
    if (user === 'password do not match') {
      return res.status(403).json({
        status: 'error',
        error: 'password must match confirm',
      });
    }
    return res.status(201).json({
      status: 'success',
      data: {
        token: user.token,
        id: user.data.id,
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        email: user.data.email,
        address: user.data.address,
        phoneNumber: user.data.phoneNumber,
        isAdmin: user.isAdmin,
      },
    });
  },

  userLogin(req, res) {
    const login = userModel.login(req.body);
    if (login === 'Does not exist') {
      return res.status(401).json({
        status: 'error',
        error: 'user does not exist',
      });
    }
    if (login === 'incorrect password') {
      return res.status(401).json({
        status: 'error',
        error: 'incorrect password',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        token: login.token,
        id: login.userExist.id,
        firstName: login.userExist.firstName,
        lastName: login.userExist.lastName,
        email: login.userExist.email,
        address: login.userExist.address,
        phoneNumber: login.userExist.phoneNumber,
        isAdmin: login.userExist.isAdmin,
      },
    });
  },
};
export default userController;
