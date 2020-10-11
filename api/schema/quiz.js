const Joi = require('joi');

const QuestionSchema = Joi.object({
  text: Joi.string().max(100),
  category: Joi.string().max(30),
});

const QuestionsSchema = Joi.array().items(QuestionSchema);

const QuizSchema = Joi.object({
  // TODO: sould max be dynaically looked up from the config file?
  mode: Joi.number().integer().min(1).max(4),
  answers: QuestionsSchema,
});

module.exports = {
  QuestionSchema,
  QuestionsSchema,
  QuizSchema,
};
