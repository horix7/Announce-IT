'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routers = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _validation = require('../helpers/validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/signup', (0, _validation.validateInput)(_validation.schemas.authSchema), _userController2.default.createUser);
router.post('/signin', (0, _validation.validateInput)(_validation.schemas.authSchema), _userController2.default.userLogin);

var routers = exports.routers = router;