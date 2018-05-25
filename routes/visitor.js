var express = require('express');
var router = express.Router();



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




module.exports = router;
