var express = require('express');
var router = express.Router();

/* GET confirmation name and page. */
router.get('/confirmation/:firstName', function(req, res) {
  res.render('confirmation', {firstName: req.param("firstName"), title: 'thanks'});
});

/* GET user List page. */
router.get('/visitorList', function(req, res) {
    res.render('visitorList', { title: 'Visitor List' });
});

/* GET user List page. */
router.get('/childSupervision', function(req, res) {
    res.render('childSupervision', { title: 'Non-Climbing Child Supervision' });
});

/* GET theSession page. */
router.get('/theSession', function(req, res) {
    res.render('theSession', { title: 'The Session' });
});

/* GET visitors  page. */
router.get('/visitor', function(req, res) {
    res.render('visitor', { title: 'Visitor Form' });
});

/* GET homepage. */
router.get('/', function(req, res) {
    res.render('homepage', { title: 'Welcome to the Castle Climbing Centre' });
});

/* GET wwa page. */
router.get('/wwa', function(req, res) {
    res.render('wwa', { title: 'Women With Attitude' });
});

/* GET Garden Volunteer page. */
router.get('/gardenVolunteer', function(req, res) {
    res.render('gardenVolunteer', { title: 'Garden Volunteer' });
});

/* POST to Add Visitor Service */
// router.post('/addVisitor', function(req, res) {
//
//   console.log(req.body);
//
//   var dt = new Date();
//   var curDate = dt.toString();
//   console.log("New Visitors added at :" + curDate);
//
//     // Set our internal DB variable
//     var db = req.db;
//
//     // Get our form values. These rely on the "name" attributes
//     var firstName = req.body.firstName;
//     var lastName = req.body.lastName;
//     var fullName = req.body.firstName + " " + req.body.lastName;
//     var contactNumber = req.body.contactNumber;
//     var companyName = req.body.companyName;
//     var supervisingChild = req.body.supervisingChild;
//     var Kid1 = req.body.Kid1;
//     var Kid2 = req.body.Kid2;
//     var reasonForVisit = req.body.reasonForVisit;
//     var otherReason = req.body.otherReason;
//     var disclaimer = req.body.disclaimer;
//     var createdDate = curDate;
//
//     // Set our collection
//     var collection = db.get('Visitors');
//
//     // Submit to the DB
//     collection.insert({
//         "fullName" : fullName,
//         "firstName" : firstName,
//         "lastName" : lastName,
//         "contactNumber" : contactNumber,
//         "companyName" : companyName,
//         "supervisingChild" : supervisingChild,
//         "ChildNames" :  {
//           "Kid1" : Kid1,
//           "Kid2" : Kid2,
//         },
//         "reasonForVisit" : reasonForVisit,
//         "otherReason" : otherReason,
//         "disclaimer" : disclaimer,
//         "createdDate" : createdDate
//
//
//     }, function (err, doc) {
//         if (err) {
//             // If it failed, return error
//             res.send("There was a problem adding the information to the database.");
//         }
//         else {
//             // And forward to success page
//             // res.redirect("visitorlist");
//             res.redirect("/confirmation/" + req.body.firstName);
//         }
//     });
// });

module.exports = router;
