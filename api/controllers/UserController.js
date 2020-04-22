const catchAsync= require('../utils/catchAsync');
const crypto = require('crypto');
const connection = require('../database/connection');
const Validation = require('../validations/business/UserBusinessvalidation');
const ValidationError = require('../errorHandling/validationError')

createUser = catchAsync(async(req,res) => {
  const id = await crypto.randomBytes(4).toString('HEX');
  const {name, email, number, city, uf} = req.body;

  const validation = await new Validation().validateCreation(req.body, req.userLogged);

  if (!validation.valid) {
    return res.status(400).json(validation.errors);
  }

  await connection('user').insert({
    id,
    name,
    email,
    number,
    city,
    uf
  });

 return res.json({ id });
});

recoverId = catchAsync(async(req, res) => {
  const email = req.body.email

  const result = await connection('user').select('id').where('email', email).first();

  return res.json({ id: result.id })
})

login = catchAsync(async(req, res) => {
  const { id } = req.body;

  const result = await connection('user').select('*').where('id', id).first();

  return res.json({ name: `${result.name}` });
});

module.exports = {
  createUser,
  login,
  recoverId
}