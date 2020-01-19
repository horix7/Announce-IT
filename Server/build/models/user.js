'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
    function User() {
        _classCallCheck(this, User);

        this.users = [];
    }

    _createClass(User, [{
        key: 'createUser',
        value: function createUser(user) {

            _dotenv2.default.config();
            var userAvailable = this.users.find(function (us) {
                return us.id == user.id;
            });
            if (userAvailable) {
                return "That id exists";
            } else {

                var user_exist = this.users.find(function (us) {
                    return us.email == user.email;
                });

                if (user_exist) {
                    return "user exists";
                } else {
                    var hashed = _bcrypt2.default.hashSync(user.password, 10);
                    var data = {
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        password: hashed,
                        phoneNumber: user.phoneNumber,
                        address: user.address,
                        is_admin: user.is_admin
                    };
                    this.users.push(data);

                    var token = _jsonwebtoken2.default.sign({ email: user.email }, process.env.PRIVATE_KEY);

                    return {
                        data: data,
                        token: token
                    };
                }
            }
        }
    }, {
        key: 'login',
        value: function login(user) {
            var userExist = this.users.find(function (us) {
                return us.email == user.email;
            });

            if (userExist) {

                if (_bcrypt2.default.compareSync(user.password, userExist.password)) {
                    var token = _jsonwebtoken2.default.sign({ email: userExist.email }, process.env.PRIVATE_KEY);
                    return {
                        user: userExist,
                        token: token
                    };
                } else {
                    return "incorrect password or email";
                }
            } else {
                return "Does not exist";
            }
        }
    }]);

    return User;
}();

exports.default = new User();