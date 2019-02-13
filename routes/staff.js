var express = require('express');
var router = express.Router();


/*
 * POST to addSession.
 */
router.post('/addClockIn', function(req, res) {
    var db = req.db;
    var collection = db.get('ClockIn');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: result } : { msg: err }
        );
    });
});


/*
 * GET userlist.
 */
router.get('/getClockIn', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('ClockIn');
    collection.find(findMe,{},function(e,docs){
        res.json(e, docs);
        console.log(e, docs);
    });
});

/*
 * POST to addSession.
 */
router.post('/addStaff', function(req, res) {
    var db = req.db;
    var collection = db.get('staff');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * POST to addSession.
 */
router.post('/addTeam', function(req, res) {
    var db = req.db;
    var collection = db.get('teamsNrates');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*
 * GET userlist.
 */
router.get('/getStaff', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('staff');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
        console.log(docs);
    });
});

router.get('/getAStaff', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('staff');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
        console.log('get');
        console.log( docs);
    });
});

//Check the person out
router.put('/updateAStaff', function(req, res){
  findMe = req.body.FindMe;
  console.log('theID');
  console.log(findMe);
  var db = req.db;
  var collection = db.get('staff');
  collection.update(findMe,req.body,function(e,docs){
      res.json(docs);
      console.log('udateAStaff');
      console.log( docs);
  });
});


router.get('/getTeams', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('teamsNrates');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
    });
});


module.exports = router;
