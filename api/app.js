const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const {
  cacheMiddleware,
  validateTokenMiddleware
} = require('./middlewares');

const {
  authRouter,
  carrerasRouter,
  materiasRouter,
  comisionRouter,
  profesorRouter,
  alumnoRouter,
  contenidosRouter
} = require('./routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cacheMiddleware);

app.use('/auth', authRouter);

app.use(validateTokenMiddleware);

app.use('/carreras', carrerasRouter);
app.use('/materias', materiasRouter);
app.use('/comision', comisionRouter);
app.use('/profesor', profesorRouter);
app.use('/alumno', alumnoRouter);
app.use('/contenidos', contenidosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
