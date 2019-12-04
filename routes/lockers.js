const express = require('express');
const router = express.Router();
const monk = require('monk');
const url = 'co-forms:27017/forms'
const db = monk(url);
// db.then(() => {
//   console.log('Connected correctly to server, at: ' + url)
// })
// const keysCollection = db.get('keys');
// const lockersCollection = db.get('lockers');
// const db = req.db;


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
    console.log(findMe);
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
        console.log('get');
        console.log( docs);
    });
});

//UPDATE SINGLE
router.put('/updateALocker', function(req, res){
  findMe = req.body.FindMe;

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

  var db = req.db;
  var collection = db.get('keys');
  collection.update(findMe,req.body,function(e,docs){
      res.json(docs);
      console.log('updateAKey');
      console.log( docs);
  });
});

router.post('/delAKey', function(req, res){
  console.log('del a key');
  var id = req.body.FindMe;
  var db = req.db;
  var collection = db.get('keys');
  collection.remove({"_id": db.id(id)},function(e,docs){
      res.json(docs);
      console.log('deleted a record');
      console.log( docs.results);
  });
});
  router.post('/delALocker', function(req, res){
    console.log('del a Locker');
    var id = req.body.FindMe;
    var db = req.db;
    var collection = db.get('lockers');
    collection.remove({"_id": db.id(id)},function(e,docs){
        res.json(docs);
        console.log('deleted a record');
        console.log( docs.results);
    });

});







module.exports = router;
