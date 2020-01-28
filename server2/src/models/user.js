import bcrypt from 'bcrypt';
import tokenHelper from '../helpers/token';
import users from './userdb';

export default class User {
  static createUser(user) {

    const userExist = users.find((us) => us.email === user.email);

    if (userExist) {
      return 'user exists';
    }
      if(user.password === user.confirm){
        const hashed = bcrypt.hashSync(user.password, 10);
        const data = {
          id: (users.length)+1,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: hashed,
          phoneNumber: user.phoneNumber,
          address: user.address,
          isAdmin: user.isAdmin,
        };
        users.push(data);
        const token = tokenHelper
          .encodeToken({ email: data.email, id: data.id, isAdmin: data.isAdmin });
        return {
          data,
          token,
        };
      }
      return "password do not match";

  }

  static login(user) {
    const userExist = users.find((us) => us.email === user.email);

    if (userExist) {
      if (bcrypt.compareSync(user.password, userExist.password)) {
        const token = tokenHelper
          .encodeToken({ email: userExist.email, id: userExist.id, isAdmin: userExist.isAdmin });
        return {
          userExist,
          token,
        };
      }

      return 'incorrect password';
    }
    return 'Does not exist';
  }
}
