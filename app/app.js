const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('../configs/default');
const _session = require('express-session');       // express session
const flash = require('connect-flash');           // flush
const router = require('../routes/router');        // router

const session = _session({
  name: config.session.key,        // session-id name
  secret: config.session.secret,   // secret-hash
  resave: config.session.resave,   // force to fresh session id
  saveUninitialized: false,        // force to create session id, even if user not logged in
  cookie: {
    maxAge: config.session.maxAge
  }
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(session);

app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.info = req.flash('info').toString();
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

// router
router(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app: app,
  session: session
}
