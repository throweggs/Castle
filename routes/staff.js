var express = require('express');
var router = express.Router();

//=============================================
// CLOCK IN DB ------------------------------
//=============================================

//ADD
router.post('/addClockIn', function(req, res) {
    var db = req.db;
    var collection = db.get('ClockIn');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});



//UPDATE SINGLE
router.put('/ClockOut', function(req, res){
  findMe = ({
    Staff_Id : req.body[0].Staff_Id,
    Clocked_Out : {$exists: false}
    });

  updateMe = {$set: req.body[1]};
  upsert = {returnOriginal: false, upsert: false};

  // console.log('theID');
  console.log(findMe);
  console.log(updateMe);
  var db = req.db;
  var collection = db.get('ClockIn');
  collection.findOneAndUpdate(findMe,updateMe,upsert,function(e,docs){
      res.json(docs);
      console.log('ClockIn');
      console.log( docs);
  });
});


//=============================================
// STAFF DB ------------------------------
//=============================================

// ADD
router.post('/addStaff', function(req, res) {
    var db = req.db;

    console.log( req.body);
    var collection = db.get('staff');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }

        );
    });
});


//GET ALL
router.get('/getStaff', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('staff');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
        // console.log(docs);
    });
});


//GET SINGLE
router.get('/getAStaff', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('staff');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
        // console.log('get');
        // console.log( docs);
    });
});

//UPDATE SINGLE
router.put('/updateAStaff', function(req, res){
  findMe = req.body.FindMe;
  // console.log('theID');
  // console.log(findMe);
  var db = req.db;
  var collection = db.get('staff');
  collection.update(findMe,req.body,function(e,docs){
      res.json(docs);
      // console.log('udateAStaff');
      // console.log( docs);
  });
});



//=============================================
// Teams DB ------------------------------
//=============================================

//ADD
router.post('/addTeam', function(req, res) {
    var db = req.db;
    var collection = db.get('teams');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


//GET ALL
router.get('/getTeams', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('teams');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
    });
});

//GET SINGLE
router.get('/getATeam', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('teams');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
        // console.log('get');
        // console.log( docs);
    });
});

//UPDATE SINGLE
router.put('/updateATeam', function(req, res){
  var findMe = req.body.FindMe;
  console.log(req.body.Team_Name);
  console.log(findMe);
  var db = req.db;
  var collection = db.get('teams');
  collection.update(findMe,req.body,function(e,docs){
      res.json(docs);

      console.log( docs);
  });
});

//GET SINGLE
router.get('/findStaffInTeam', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('staff');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
        console.log('get');
        console.log( docs);
    });
});


router.get('/StaffPresent', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('staff');
    collection.findOneAndUpdate(findMe, {$set: {"Present": true}},function(e,docs){
        res.json(docs);
        console.log('get');
        console.log( docs);
    });
});

router.get('/StaffNotPresent', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('staff');
    collection.findOneAndUpdate(findMe, {$set: {"Present": false}},function(e,docs){
        res.json(docs);
        console.log('get');
        console.log( docs);
    });
});







module.exports = router;
