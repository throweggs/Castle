var express = require('express');
var router = express.Router();


/*
 * POST to addSession.
 */
router.post('/postFeedback', function(req, res) {
    var db = req.db;
    console.log(req);

    var collection = db.get('feedback');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: err } : { msg: err }
        );
    });
});



/*
 * GET userlist.
 */
router.get('/getFeedback', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('feedback');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
    });
});


//UPDATE SINGLE
router.put('/updateFeedback', function(req, res){
  findMe = req.body.FindMe;
  theUpdate = req.body.Details

  var db = req.db;
  var collection = db.get('feedback');
  collection.update(findMe,theUpdate,function(e,docs){
      res.json(docs);
      console.log('update');
      console.log( docs);
  });
});


module.exports = router;
