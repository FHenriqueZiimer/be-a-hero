const ValidationError = require('../errorHandling/validationError');
const Joi = require('joi');

const validationMiddleware = (schema, property) => {
  return (req, res, next) => {

    const { error } = Joi.validate(req[property], schema, { abortEarly: false });
    const valid = error == null;
    if (valid) { next(); }
    else {
      const errorMessages = error.details.map(_ => `${_.message.replace(/['"]+/g, '')} (valor enviado: ${_.context.value || ""})`);
      res.json(new ValidationError(errorMessages));
    }
  }
}

module.exports = validationMiddleware;