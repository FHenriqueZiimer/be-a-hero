const catchAsync= require('../utils/catchAsync');
const crypto = require('crypto');
const connection = require('../database/connection');

createUser = catchAsync(async(req,res) => {
  const id = await crypto.randomBytes(4).toString('HEX');
  const {name, email, number, city, uf} = req.body;

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

login = catchAsync(async(req, res) => {
  const { id } = req.body;

  const result = await connection('user').select('*').where('id', id).first();

  return res.json({ name: `${result.name}` });
});

module.exports = {
  createUser,
  login
}