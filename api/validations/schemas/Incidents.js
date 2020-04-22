const Joi = require('joi');

const incidentSchema = {
  incidentBody: Joi.object().keys({
    title: Joi.string().trim().required().options({
      language: {
        string: { base: '-  propriedade title é inválida' },
        any: { empty: '- propriedade title é inválida', required: '- propriedade title é obrigatória' }
      }
    }),
    description: Joi.string().trim().required().options({
      language: {
        string: { base: '-  propriedade description é inválida' },
        any: { empty: '- propriedade description é inválida', required: '- propriedade description é obrigatória' }
      }
    }),
    value: Joi.string().trim().required().options({
      language: {
        string: { base: '-  propriedade value é inválida' },
        any: { empty: '- propriedade value é inválida', required: '- propriedade value é obrigatória' }
      }
    })
  }).unknown(true)
}

module.exports = incidentSchema