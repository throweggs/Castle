var express = require('express');
var router = express.Router();


/*
 * POST to addSession.
 */
router.post('/addPerson', function(req, res) {
    var db = req.db;
    var collection = db.get('thamesWater');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * GET userlist.
 */
router.get('/getDay', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('thamesWater');
    collection.find(findMe,{},function(e,docs){
        res.json(docs);
    });
});

//Check the person out
router.put('/updatePerson', function(req, res){
  thePerson = req.body.FindPerson;
  console.log(req.body);
  var db = req.db;
  var collection = db.get('thamesWater');
  collection.update(thePerson,req.body,function(e,docs){
      res.json(docs);
  });
});


module.exports = router;
