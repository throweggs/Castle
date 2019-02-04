var express = require('express');
var router = express.Router();

/*
 * POST to addSession.
 */
router.post('/setLevels', function(req, res) {
    var db = req.db;
    var collection = db.get('sonos');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.post('/addPlayer', function(req, res) {
    var db = req.db;
    var collection = db.get('sonos');
    console.log(req.body);
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.post('/addTrack', function(req, res) {
    var db = req.db;
    var collection = db.get('sonosTracks');
    console.log(req.body);
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

// db.foo.find().sort({_id:1}).limit(50);

router.get('/getHistory', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('sonosTracks');
    collection.find({},{ limit : 1000, sort : { _id : 1 } },function(e,docs){
        res.json(docs);
    });
});

router.put('/updateTrack', function(req, res){
  theTrack = req.body._id;
  console.log(req.body._id);
  var db = req.db;
  var collection = db.get('sonosTracks');
  collection.update(theTrack,req.body,function(e,docs){
      res.json(docs);
  });
});

/*
 * GET userlist.
 */
 router.get('/getStatus', function(req, res) {
     findMe = req.query;
     var db = req.db;
     var collection = db.get('sonosBackend');
     collection.find({},{},function(e,docs){
         res.json(docs);
     });
 });

 router.get('/sonosVolumeInfo', function(req, res) {
     findMe = req.query;
     var db = req.db;
     var collection = db.get('sonos');
     collection.find({},{},function(e,docs){
         res.json(docs);
     });
 });

 router.put('/updateSavedInfo', function(req, res){
   console.log(req.body);
   theID = req.body._id;

   var db = req.db;
   var collection = db.get('sonosBackend');
   collection.update(theID,req.body,function(e,docs){
       res.json(docs);
   });
 });


 //Updates an theSession
 router.put('/updateMaxVolume', function(req, res){
   theIDnum = req.body._id;
   console.log(req.body);
   var db = req.db;
   var collection = db.get('sonos');
   collection.update(theIDnum,req.body,function(e,docs){
       res.json(docs);
   });
 });



router.put('/updatePlayer', function(req, res){
  thePlayer = req.body._id;
  console.log(req.body);
  var db = req.db;
  var collection = db.get('sonos');
  collection.update(thePlayer,req.body,function(e,docs){
    res.send(
        (err === null) ? { msg: '' } : { msg: err }
    );

  });
});

router.put('/removeOldRecords', function(req, res){
  var db = req.db;
  var collection = db.get('sonosTracks');
  collection.find({'catID': catID, 'subID': subID}, {_id: 1}).sort({'_id': -1}).skip(9).limit(1, function (err, docs) {
      if(!err && docs.length) {
          // If there was a 21st _id, remove it and all logs older than it for that category and subcategory
          collection.remove({'catID': catID, 'subID': subID, '_id': {$lte: mongojs.ObjectId(docs[0]._id)}}, callback);
          return;
      }
      callback(err, docs);
  });
});


module.exports = router;
