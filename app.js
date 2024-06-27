var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var pacientesRouter = require('./routes/pacientes');
var authRouter = require('./routes/auth');
var examenesRouter = require('./routes/examenes');
var ordenesRouter = require('./routes/ordenes');
var muestrasRouter = require('./routes/muestras');
var resultadosRouter= require('./routes/resultados');
var detallesRouter = require('./routes/detalles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'mi clave super secreta',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/usuarios', usuariosRouter);
app.use('/pacientes', pacientesRouter);
app.use('/examenes', examenesRouter);
app.use('/ordenes', ordenesRouter);
app.use('/muestras', muestrasRouter);
app.use('/resultados', resultadosRouter);
app.use('/detalles', detallesRouter);

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
