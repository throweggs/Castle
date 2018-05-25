var express = require('express');
var router = express.Router();



/*
 * POST to addSupervisor.
 */
router.post('/addSupervisor', function(req, res) {
    var db = req.db;
    var collection = db.get('Non-Climbing Child');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});




module.exports = router;
