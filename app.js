var express = require('express');
var path = require('path');
var $ = require('jquery');
var jquery = require('jquery');
var jQuery = require('jquery');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
var popper = require('popper.js');
var tooltip = require('tooltip.js');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;


var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/Castle');

var index = require('./routes/index');
var users = require('./routes/users');
var childSupervisor = require('./routes/childSupervisor');
var theSession = require('./routes/theSession');
var visitor = require('./routes/visitor');
var dashboard = require('./routes/dashboard');
var wwa = require('./routes/wwa');
var homepage = require('./routes/homepage');
var gardenVolunteer = require('./routes/gardenVolunteer');
var thamesWater = require('./routes/thamesWater');
var login = require('./routes/login');


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    login.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  // Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  login.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/childSupervisor', childSupervisor);
app.use('/theSession', theSession);
app.use('/dashboard', dashboard);
app.use('/visitor', visitor);
app.use('/wwa', wwa);
app.use('/homepage', homepage);
app.use('/gardenVolunteer', gardenVolunteer);
app.use('/thamesWater', thamesWater);

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/moment', express.static(__dirname + '/node_modules/moment')); // redirect moments JS
app.use('/tempus', express.static(__dirname + '/node_modules/tempusdominus-bootstrap-4')); // redirect tempus JS



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
