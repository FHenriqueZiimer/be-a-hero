const Joi = require('joi');

const registerSchema = {
  registerBody: Joi.object().keys({
    name: Joi.string().trim().required().options({
      language: {
        string: { base: '-  propriedade name é inválida' },
        any: { empty: '- propriedade name é inválida', required: '- propriedade name é obrigatória' }
      }
    }),
    number: Joi.string().trim().required().min(11).max(15).options({
      language: {
        string: {
          base: '-  propriedade telefone do cliente é inválida',
          min: '- propriedade telefone com menos de onze digitos',
          max: '- propriedade telefone com mais de onze digitos'
        },
        any: { empty: '- propriedade to(Telefone do cliente) é inválida', required: '- propriedade to(Telefone do cliente) é obrigatória' }
      }
    }),
    email: Joi.string().email({ allowUnicode: false, minDomainAtoms: 2 }).options({
      language: {
        string: {
          base: '- propriedade email inválida',
          email: '- propriedade email com formato inválido'
        },
        any: { empty: '- propriedade email inválida'},
      }
    }),
  }).unknown(true)
}

module.exports = registerSchema