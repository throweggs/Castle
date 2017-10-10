var express = require('express');
var router = express.Router();

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
router.get('/visitors', function(req, res) {
    res.render('visitors', { title: 'Visitor List' });
});


/* POST to Add Visitor Service */
router.post('/addVisitor', function(req, res) {

  console.log(req.body);

  var dt = new Date();
  var curDate = dt.toString();
  console.log("New Visitors added at :" + curDate);

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var fullName = req.body.firstName + " " + req.body.lastName;
    var contactNumber = req.body.contactNumber;
    var companyName = req.body.companyName;
    var supervisingChild = req.body.supervisingChild;
    var Kid1 = req.body.kid1;
    var Kid2 = req.body.kid2;
    var Kid3 = req.body.kid3;
    var reasonForVisit = req.body.reasonForVisit;
    var otherReason = req.body.otherReason;
    var disclaimer = req.body.disclaimer;
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
        "ChildNames" :  {
          "Kid1" : Kid1,
          "Kid2" : Kid2,
          "Kid3" : Kid3,
        },
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
        }
    });
});

module.exports = router;
