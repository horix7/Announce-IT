import bcrypt from 'bcrypt';
import tokenHelper from '../helpers/token';
import users from './userdb';

export default class User {
  static createUser(user) {
    const userAvailable = users.find((us) => us.id === user.id);
    if (userAvailable) {
      return 'That id exists';
    }

    const userExist = users.find((us) => us.email === user.email);

    if (userExist) {
      return 'user exists';
    }

    const hashed = bcrypt.hashSync(user.password, 10);
    const data = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: hashed,
      phoneNumber: user.phoneNumber,
      address: user.address,
      is_admin: user.is_admin,
    };
    users.push(data);

    const token = tokenHelper
      .encodeToken({ email: data.email, id: data.id, is_admin: data.is_admin });

    return {
      data,
      token,
    };
  }

  static login(user) {
    const userExist = users.find((us) => us.email === user.email);

    if (userExist) {
      if (bcrypt.compareSync(user.password, userExist.password)) {
        const token = tokenHelper
          .encodeToken({ email: userExist.email, id: userExist.id, is_admin: userExist.is_admin });
        return {
          user: userExist,
          token,
        };
      }

      return 'incorrect password';
    }
    return 'Does not exist';
  }
}
