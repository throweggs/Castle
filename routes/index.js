var express = require('express');
var router = express.Router();
var simpleDate = require('simple-date');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to the Castle Climbing Centre' });
});

// /* GET user List page. */
// router.get('/confirmation', function(req, res) {
//     res.render('confirmation', { title: 'thanks' });
// });

/* GET confirmation name and page. */
router.get('/confirmation/:firstName', function(req, res) {
  res.render('confirmation', {firstName: req.param("firstName"), title: 'thanks'});
});

/* GET user List page. */
router.get('/visitorlist', function(req, res) {
    res.render('visitorlist', { title: 'Visitor List' });
});

/* GET visitors page page. */
router.get('/visitor', function(req, res) {
    res.render('visitor', { title: 'Visitor Form' });
});

/* GET visitors page page. */
router.get('/1', function(req, res) {
    res.render('homepage', { title: 'Welcome to the Castle Climbing Centre' });
});


/* POST to Add Visitor Service */
router.post('/addVisitor', function(req, res) {

  console.log(req.body);

  // var dt = new Date();
  // var curDate = dt.toString();
  // console.log("New Visitors added at :" + curDate);

  var dateObj = new Date();
  var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  var year = dateObj.getFullYear();
  var curDate = day + "/" + month + "/" + year;

    if (req.body.supervisingChild === "") {
      var supervisingChild = false;
    }
      else if (req.body.supervisingChild === "on") {
        var supervisingChild = true;
      };

    if (req.body.disclaimer === "") {
      var disclaimer = false;
    }
      else if (req.body.disclaimer === "on") {
        var disclaimer = true;
      };


    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var fullName = req.body.firstName + " " + req.body.lastName;
    var contactNumber = req.body.contactNumber;
    var companyName = req.body.companyName;
    var supervisingChild = supervisingChild;
    var Kid1 = req.body.Kid1;
    var Kid2 = req.body.Kid2;
    var reasonForVisit = req.body.reasonForVisit;
    var otherReason = req.body.otherReason;
    var disclaimer = disclaimer;
    var createdDate = curDate;

    // Set our collection
    var collection = db.get('Visitors');

    // Submit to the DB
    collection.insert({
        "fullName" : fullName,
        "firstName" : firstName,
        "lastName" : lastName,
        "contactNumber" : contactNumber,
        "companyName" : companyName,
        "supervisingChild" : supervisingChild,
        "ChildNames" :  [ Kid1, Kid2 ],
        "reasonForVisit" : reasonForVisit,
        "otherReason" : otherReason,
        "disclaimer" : disclaimer,
        "createdDate" : createdDate


    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            // res.redirect("visitorlist");
            res.redirect("/confirmation/" + req.body.firstName);
            console.log("New Visitors added at :" + current_date);
        }
    });
});


module.exports = router;
