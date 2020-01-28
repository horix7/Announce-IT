import Joi from 'joi';


const schemas = {
  authSchema: Joi.object().keys({
    email: Joi.string().required().email(),
    firstName: Joi.string().alphanum().min(3).max(8),
    lastName: Joi.string().alphanum().min(3).max(8),
    address: Joi.string(),
    phoneNumber: Joi.string(),
    password: Joi.string().required(),
    confirm: Joi.string().required(),
    isAdmin: Joi.boolean(),
  }).options({ abortEarly: false }),
  authLogin: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }),
  announceSchema: Joi.object().keys({
    status: Joi.string().valid(['pending', 'accepted', 'declined', 'active', 'deactive']),
    text: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }).options({ abortEarly: false }),
  updateAnnounce: Joi.object().keys({
    status: Joi.string().valid(['pending', 'accepted', 'declined', 'active', 'deactive']),
    text: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
  }).options({ abortEarly: false }),
};
const validateInput = (schema) => (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details,
    });
  }

  return next();
};

export { schemas, validateInput };
