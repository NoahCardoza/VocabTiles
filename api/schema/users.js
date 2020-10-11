const Joi = require('joi');

const dbSchema = Joi.object({
  id: Joi.string().alphanum().required(),
  username: Joi.string().alphanum().required(),
  firebase_id: Joi.string().required(),
  literacy_level: Joi.number().integer().min(1),
});

// const reqSchema = Joi.object({
//   user_id: Joi.string().alphanum().required(),
//   name: Joi.string().alphanum().required(),
//   email: Joi.string().email().required(),
//   email_verified: Joi.boolean().required(),
//   picture: Joi.string().uri().required(),
// });

module.exports = {
  dbSchema,
  // reqSchema,
};
