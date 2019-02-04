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
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * GET userlist.
 */
router.get('/getPlayers', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('sonos');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
    });
});

router.put('/updatePlayer', function(req, res){
  console.log(req.body._id);
  theID = req.body._id;

  var db = req.db;
  var collection = db.get('sonos');
  collection.update(theID,req.body,function(e,docs){
      res.json(docs);
  });
});



module.exports = router;
