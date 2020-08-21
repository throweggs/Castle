var express = require('express');
var router = express.Router();


router.post('/addIssue', function(req, res) {
    var db = req.db;
    console.log('hit');
    var collection = db.get('Floor Walking');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.get('/getData', function(req, res) {
  console.log('hit')
    findMe = req.query;
    var db = req.db;
    var collection = db.get('Floor Walking');
    collection.find(findMe,{},function(e,docs){
      console.log(docs)
        res.json(docs);
    });
});

//Updates an Participants
router.put('/updateCount', function(req, res){

  findMe = req.body[0];
  theUpdate = req.body[1];
  console.log(findMe);
    console.log(theUpdate);
  var db = req.db;
  var collection = db.get('Floor Walking');
  collection.update(findMe, theUpdate,function(e,docs){
    console.log(e)
      res.json(docs);

  });
});

module.exports = router;
