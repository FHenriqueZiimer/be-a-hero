const express = require('express');
const validationMiddleware = require('../middlewares/validationMiddleware');
const schemas = require('../validations/schemas/Incidents')
const IncidentsController = require('../controllers/IncidentsController');
const routes = express.Router();

routes.post('/incidents/new', validationMiddleware(schemas.incidentBody, 'body'), IncidentsController.createIncident)
routes.get('/incidents', IncidentsController.getIncidents)
routes.delete('/incidents/:id', IncidentsController.deleteIncident)

module.exports = routes