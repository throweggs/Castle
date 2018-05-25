var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/forms', function(req, res) {
    var db = req.db;
    var collection = db.get('Forms');
    var options = {
        "limit": 20,
        "sort": "formName"
      };
    collection.find({},options,function(e,docs){
        res.json(docs);
    });
});


module.exports = router;
