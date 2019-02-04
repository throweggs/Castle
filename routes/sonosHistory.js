var express = require('express');
var router = express.Router();

router.get('/getHistory', function(req, res) {
    findMe = req.query;
    var db = req.db;
    var collection = db.get('sonosTracks');
    collection.find({},{ limit : 1000, sort : { _id : 1 } },function(e,docs){
        res.json(docs);
    });
});



module.exports = router;
