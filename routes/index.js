var express = require('express');
var router = express.Router();

/* GET confirmation name and page. */
router.get('/confirmation/:firstName', function(req, res) {
  res.render('confirmation', {firstName: req.param("firstName"), title: 'thanks'});
});



/* GET user List page. */
router.get('/childSupervision', function(req, res) {
    res.render('childSupervision', { title: 'Non-Climbing Child Supervision' });
});

/*

 GET theSession page. */
router.get('/theSession', function(req, res) {
    res.render('theSession', { title: 'The Session' });
});


/* GET theSocial page. */
router.get('/theSocial', function(req, res) {
    res.render('theSocial', { title: 'The Social' });
});

/* GET visitors  page. */
router.get('/visitor', function(req, res) {
    res.render('visitor', { title: 'Visitor Form' });
});

/* GET visitors  page. */
router.get('/visitorTestnTrace', function(req, res) {
    res.render('visitorTestnTrace', { title: 'Visitor Form - Test and Trace' });
});

/* GET visitors  page. */
router.get('/feedback', function(req, res) {
    res.render('feedback', { title: 'Feedback, Comments and Surgestions' });
});

/* GET homepage. */
router.get('/', function(req, res) {
    res.render('homepage', { title: 'Welcome' });
});

/* GET wwa page. */
router.get('/wbs', function(req, res) {
    res.render('wbs', { title: 'Womens Bouldering Social' });
});

/* GET Garden Volunteer page. */
router.get('/gardenVolunteer', function(req, res) {
    res.render('gardenVolunteer', { title: 'Garden Volunteer' });
});

router.get('/thamesWater', function(req, res) {
    res.render('thamesWater', { title: 'Thames Water Worker' });
});



router.get('/sonosBackend', function(req, res) {
    res.render('sonosBackend', { title: 'Sonos Backend Watcher' });
});


router.get('/sonosHistory', function(req, res) {
    res.render('sonosHistory', { title: 'Sonos Track History' });
});

router.get('/staff', function(req, res) {
    res.render('staff', { title: 'Staff' });
});

/* GET Dash boars page. */
router.get('/dashboard', function(req, res) {
    res.render('Dashboard/dashboard', { title: 'Dashboard' });
});


router.get('/viewVisitors', function(req, res) {
    res.render('Dashboard/viewVisitors', { title: 'Visitors' });
});

router.get('/last5', function(req, res) {
    res.render('Dashboard/last5', { title: 'last 5' });
});

router.get('/viewLockers', function(req, res) {
    res.render('Dashboard/viewLockers', { title: 'lockers' });
});

router.get('/viewWBS', function(req, res) {
    res.render('Dashboard/viewWBS', { title: 'Womens Bouldering Social' });
});

router.get('/viewTheSession', function(req, res) {
    res.render('Dashboard/viewTheSession', { title: 'TheSession' });
});

router.get('/viewTheSocial', function(req, res) {
    res.render('Dashboard/viewTheSocial', { title: 'TheSocial' });
});

router.get('/viewStaff', function(req, res) {
    res.render('Dashboard/viewStaff', { title: 'Staff' });
});

router.get('/viewNCC', function(req, res) {
    res.render('Dashboard/viewNCC', { title: 'Non-climbing Child' });
});

router.get('/viewTW', function(req, res) {
    res.render('Dashboard/viewTW', { title: 'Thames Water' });
});

router.get('/viewFeedback', function(req, res) {
    res.render('Dashboard/viewFeedback', { title: 'Feedback' });
});

router.get('/viewTeams', function(req, res) {
    res.render('Dashboard/viewTeams', { title: 'Teams' });
});

router.get('/clockIn', function(req, res) {
    res.render('Dashboard/clockIn', { title: 'Clock In / Clock Out' });
});

router.get('/DataEntry', function(req, res) {
    res.render('Dashboard/DataEntry', { title: 'Data Entry' });
});

router.get('/personalTrainer', function(req, res) {
    res.render('personalTrainer', { title: 'Personal Trainer' });
});

router.get('/groups', function(req, res) {
    res.render('groups', { title: 'Groups' });
});

router.get('/Sunset', function(req, res) {
    res.render('Dashboard/Sunset', { title: 'Sunset Sunrise' });
});


router.get('/DMCheckSheet', function(req, res) {
    res.render('DMs/DMCheckSheet', { title: 'DM Daily Check Sheet' });
});

router.get('/DMFloorWalking', function(req, res) {
    res.render('DMs/DMFloorWalking', { title: 'DM Floor Walking Sheet' });
});

module.exports = router;
