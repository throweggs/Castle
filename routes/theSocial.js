var express = require('express');
var router = express.Router();


/*
 * POST to addSocial.
 */
router.post('/addSocial', function(req, res) {
    var db = req.db;
    console.log('hit');
    var collection = db.get('theSocial');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * GET userlist.
 */
router.get('/getSocial', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('theSocial');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
    });
});


//Updates an theSocial
router.put('/updateSocial', function(req, res){
  theDate = req.body.FindDate;
  theUpdate = req.body.Details;
  console.log(theDate);
    console.log(theUpdate);
  var db = req.db;
  var collection = db.get('theSocial');
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
  var collection = db.get('theSocial');
  collection.update(theDate, theUpdate,function(e,docs){
      res.json(docs);
  });
});



module.exports = router;
