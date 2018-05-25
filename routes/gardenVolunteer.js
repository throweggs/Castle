var express = require('express');
var router = express.Router();


/*
 * POST to addSession.
 */
router.post('/createSession', function(req, res) {
  console.log('creating Session');
    var db = req.db;
    var collection = db.get('GardenVolunteer');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * GET userlist.
 */
 router.get('/getGardenVolunteer', function(req, res) {
   console.log('get Session');
     findMe = req.query;
     var db = req.db;
     var collection = db.get('GardenVolunteer');
     collection.find(findMe,{},function(e,docs){
         res.json(docs);
     });
 });

//Updates an theSession
router.put('/updateGardenVolunteer', function(req, res){
  theDate = req.body.FindDate;
  console.log(theDate);
  var db = req.db;
  var collection = db.get('GardenVolunteer');
  collection.update(theDate,req.body,function(e,docs){
      res.json(docs);
  });
});


module.exports = router;
