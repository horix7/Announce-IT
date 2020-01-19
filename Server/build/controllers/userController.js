"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userController = {
    createUser: function createUser(req, res) {

        var user = _user2.default.createUser(req.body);
        if (user == "user exists") {
            return res.status(403).json({
                "status": "error",
                "error": "That email has been used"
            });
        } else if (user == "That id exists") {
            return res.status(403).json({
                "status": "error",
                "error": "That id already exists"
            });
        }
        return res.status(201).json({
            "status": "success",
            "data": {
                "token": user.token,
                "id": user.data.id,
                "first_name": user.data.first_name,
                "last_name": user.data.last_name,
                "email": user.data.email,
                "address": user.data.address,
                "phoneNumber": user.data.phoneNumber,
                "is_admin": user.is_admin
            }
        });
    },
    userLogin: function userLogin(req, res) {
        var login = _user2.default.login(req.body);
        if (login == "Does not exist") {
            return res.status(401).json({
                "status": "error",
                "error": "user does not exist"
            });
        } else if (login == "incorrect password or email") {
            return res.status(401).json({
                "status": "error",
                "error": "incorrect password or email"
            });
        } else {
            return res.status(200).json({
                "status": "success",
                "data": {
                    "token": login.token,
                    "id": login.user.id,
                    "first_name": login.user.first_name,
                    "last_name": login.user.last_name,
                    "email": login.user.email,
                    "address": login.user.address,
                    "phoneNumber": login.user.phoneNumber,
                    "is_admin": login.user.is_admin
                }
            });
        }
    }
};
exports.default = userController;