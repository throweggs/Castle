var express = require('express');
var router = express.Router();


/*
 * POST to addSession.
 */
router.post('/addGroup', function(req, res) {
    var db = req.db;
    console.log('hit');
    var collection = db.get('Groups');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * GET userlist.
 */
router.get('/getGroups', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('Groups');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
    });
});


//Updates an theSession
router.put('/updateGroup', function(req, res){
  theDate = req.body.FindDate;
  theUpdate = req.body.Details;
  console.log(theDate);
    console.log(theUpdate);
  var db = req.db;
  var collection = db.get('Groups');
  collection.findOneAndUpdate(theDate,theUpdate,function(e,docs){
      res.json(docs);
  });
});

//GET SINGLE
router.get('/getAGroup', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('Groups');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
        // console.log('get');
        // console.log( docs);
    });
});

//UPDATE SINGLE
router.put('/updateAGroup', function(req, res){
  findMe = req.body.FindMe;
  console.log('Hit UPDATE');
  console.log(findMe);
  console.log(req.body);
  var db = req.db;
  var collection = db.get('Groups');
  collection.update(findMe,req.body,function(e,docs){
      res.json(docs);
      console.log('updateAGroup');
      console.log( docs);
  });
});


module.exports = router;
