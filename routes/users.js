var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/visitorlist', function(req, res) {
    var db = req.db;
    var collection = db.get('Visitors');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to addVisitor.
 */
router.post('/addVisitor', function(req, res) {
    var db = req.db;
    var collection = db.get('Visitors');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * POST to addSession.
 */
router.post('/addSession', function(req, res) {
    var db = req.db;
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
router.get('/theSession', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('theSession');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
    });
});

//Updates an theSession
router.put('/updateSession', function(req, res){
  theID = req.body.FindDate;
  console.log(theID);
  var db = req.db;
  var collection = db.get('theSession');
  collection.update(theID,req.body,function(e,docs){
      res.json(docs);
  });
});


module.exports = router;
