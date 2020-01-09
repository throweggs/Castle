var express = require('express');
var path = require('path');
// var request = require('request');
// var rp = require('request-promise');
var $ = require('jquery');
var jquery = require('jquery');
var jQuery = require('jquery');
var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
// var popper = require('popper.js');
// var tooltip = require('tooltip.js');
var Chart = require('chart.js');
var SunCalc = require('suncalc');
// var easyAutocomplete = require('easy-autocomplete');



const mongo = require('mongodb');
const monk = require('monk');
const url = 'co-forms:27017/forms'
const db = monk(url);
db.then(() => {
  console.log('Connected correctly to server, at: ' + url)
})


var index = require('./routes/index');
var users = require('./routes/users');
var childSupervisor = require('./routes/childSupervisor');
var theSession = require('./routes/theSession');
var visitor = require('./routes/visitor');
var dashboard = require('./routes/dashboard');
var wbs = require('./routes/wbs');
var homepage = require('./routes/homepage');
var gardenVolunteer = require('./routes/gardenVolunteer');
var personalTrainer = require('./routes/personalTrainer');
var thamesWater = require('./routes/thamesWater');
var sonos = require('./routes/sonos');
var sonosBackend = require('./routes/sonosBackend');
var sonosHistory = require('./routes/sonosHistory');
var staff = require('./routes/staff');
var lockers = require('./routes/lockers');
var groups = require('./routes/groups');
var sunrise = require('./routes/sunrise');
var feedback = require('./routes/feedback');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
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
app.use('/personalTrainer', personalTrainer);
app.use('/groups', groups);
app.use('/feedback', feedback);



//Sonos
app.use('/sonos', sonos);
app.use('/sonosBackend', sonosBackend);
app.use('/sonosHistory', sonosHistory);

//Staff
app.use('/staff', staff);

//Dashboard
app.use('/dashboard', dashboard);
app.use('/lockers', lockers);



app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/')); // redirect bootstrap JS
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/'));
// app.use('/popper', express.static(__dirname + '/node_modules/popper.js'));
// app.use('/tooltip', express.static(__dirname + '/node_modules/tooltip.js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/moment', express.static(__dirname + '/node_modules/moment')); // redirect moments JS
// app.use('/tempus', express.static(__dirname + '/node_modules/tempusdominus-bootstrap-4')); // redirect tempus JS
app.use('/daterangepicker', express.static(__dirname + '/node_modules/daterangepicker')); // redirect tempus JS
app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free')); // redirect tempus JS
app.use('/chart.js', express.static(__dirname + '/node_modules/chart.js'));
app.use('/SunCalc', express.static(__dirname + '/node_modules/suncalc'));
app.use('/easy-autocomplete', express.static(__dirname + '/node_modules/easy-autocomplete'));



// app.use('/request', express.static(__dirname + '/node_modules/request')); // redirect tempus JS




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
