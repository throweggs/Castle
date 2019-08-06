var express = require('express');
var router = express.Router();


// ADD
router.post('/addLocker', function(req, res) {
    var db = req.db;
    console.log('Hit NEW');
    console.log(req.body);
    var collection = db.get('lockers');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }

        );
    });
});

router.post('/addKey', function(req, res) {
    var db = req.db;
    console.log('Hit NEW');
    console.log(req.body);
    var collection = db.get('keys');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }

        );
    });
});


//GET ALL
router.get('/getLockers', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('lockers');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
        // console.log(docs);
    });
});


router.get('/getKeys', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('keys');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
        // console.log(docs);
    });
});

//GET SINGLE
router.get('/getALocker', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('lockers');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
        // console.log('get');
        // console.log( docs);
    });
});

//GET SINGLE
router.get('/getAKey', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('keys');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
        // console.log('get');
        // console.log( docs);
    });
});

//UPDATE SINGLE
router.put('/updateALocker', function(req, res){
  findMe = req.body.FindMe;
  console.log('Hit UPDATE');
  console.log(findMe);
  console.log(req.body);
  var db = req.db;
  var collection = db.get('lockers');
  collection.update(findMe,req.body,function(e,docs){
      res.json(docs);
      console.log('updateALocker');
      console.log( docs);
  });
});

//UPDATE SINGLE
router.put('/updateAKey', function(req, res){
  findMe = req.body.FindMe;
  console.log('Hit UPDATE');
  console.log(findMe);
  console.log(req.body);
  var db = req.db;
  var collection = db.get('keys');
  collection.update(findMe,req.body,function(e,docs){
      res.json(docs);
      console.log('updateAKey');
      console.log( docs);
  });
});








module.exports = router;
