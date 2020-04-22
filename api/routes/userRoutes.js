const express = require('express');
const validationMiddleware = require('../middlewares/validationMiddleware');
const schemas = require('../validations/schemas/Register')
const UserController = require('../controllers/UserController');
const routes = express.Router();

routes.post('/user', validationMiddleware(schemas.registerBody, 'body'), UserController.createUser)
routes.post('/login', UserController.login )
routes.post('/recover', UserController.recoverId)

module.exports = routes