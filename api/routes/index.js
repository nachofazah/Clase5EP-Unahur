const authRouter = require('./auth');
const carrerasRouter = require('./carreras');
const materiasRouter = require('./materias');
const comisionRouter = require('./comision');
const profesorRouter = require('./profesor');
const alumnoRouter = require('./alumno');
const contenidosRouter = require('./contenidos');

module.exports = {
  authRouter,
  carrerasRouter,
  materiasRouter,
  comisionRouter,
  profesorRouter,
  alumnoRouter,
  contenidosRouter
};
