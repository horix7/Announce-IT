'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

    schemas: { authSchema: _joi2.default.object().keys({
            id: _joi2.default.number().integer().required(),
            email: _joi2.default.string().required().email(),
            first_name: _joi2.default.string().min(3).max(8),
            last_name: _joi2.default.string().min(3).max(8),
            address: _joi2.default.string(),
            phoneNumber: _joi2.default.string(),
            password: _joi2.default.string(),
            is_admin: _joi2.default.boolean()
        }).options({ abortEarly: false })
    },
    validateInput: function validateInput(schema) {
        return function (req, res, next) {
            var result = _joi2.default.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json({
                    message: result.error.details
                });
            } else {
                next();
            }
        };
    }
};