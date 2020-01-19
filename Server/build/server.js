'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userRoutes = require('./routes/userRoutes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use('/api/v1/auth', _userRoutes.routers);

app.listen(5000);