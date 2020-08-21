var express = require('express');
var router = express.Router();


/*
 * POST to addSession.
 */
router.post('/addSession', function(req, res) {
    var db = req.db;
    console.log('hit');
    var collection = db.get('theSession');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * GET userlist.
 */
router.get('/getSession', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('theSession');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
    });
});


//Updates an theSession
router.put('/updateSession', function(req, res){
  theDate = req.body.FindDate;
  theUpdate = req.body.Details;
  console.log(theDate);
    console.log(theUpdate);
  var db = req.db;
  var collection = db.get('theSession');
  collection.findOneAndUpdate(theDate,theUpdate,function(e,docs){
      res.json(docs);
  });
});

//Updates an Participants
router.put('/updateParticipant', function(req, res){
  console.log('hit');
  theDate = req.body.FindDate;
  theUpdate = req.body.Details;
  console.log(theDate);
    console.log(theUpdate);
  var db = req.db;
  var collection = db.get('theSession');
  collection.update(theDate, theUpdate,function(e,docs){
      res.json(docs);
  });
});



module.exports = router;
