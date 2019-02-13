var express = require('express');
var path = require('path');
var request = require('request');
var rp = require('request-promise');
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




var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/forms');

var index = require('./routes/index');
var users = require('./routes/users');
var childSupervisor = require('./routes/childSupervisor');
var theSession = require('./routes/theSession');
var visitor = require('./routes/visitor');
var dashboard = require('./routes/dashboard');
var wbs = require('./routes/wbs');
var homepage = require('./routes/homepage');
var gardenVolunteer = require('./routes/gardenVolunteer');
var thamesWater = require('./routes/thamesWater');
var sonos = require('./routes/sonos');
var sonosBackend = require('./routes/sonosBackend');
var sonosHistory = require('./routes/sonosHistory');
var staff = require('./routes/staff');

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

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/childSupervisor', childSupervisor);
app.use('/theSession', theSession);
app.use('/visitor', visitor);
app.use('/wbs', wbs);
app.use('/homepage', homepage);
app.use('/gardenVolunteer', gardenVolunteer);
app.use('/thamesWater', thamesWater);

//Sonos
app.use('/sonos', sonos);
app.use('/sonosBackend', sonosBackend);
app.use('/sonosHistory', sonosHistory);

//Staff
app.use('/staff', staff);

//Dashboard
app.use('/dashboard', dashboard);



app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/moment', express.static(__dirname + '/node_modules/moment')); // redirect moments JS
app.use('/tempus', express.static(__dirname + '/node_modules/tempusdominus-bootstrap-4')); // redirect tempus JS

app.use('/request', express.static(__dirname + '/node_modules/request')); // redirect tempus JS




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
