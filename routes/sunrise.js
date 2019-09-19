var express = require('express');
var router = express.Router();



//GET ALL
router.get('/getSunset', function(req, res) {
  return('hit');
});


// //GET ALL
// router.get('/getSunset', function(req, res) {
//     findMe ='ctrl?switch=3&action=trigger';
//     var twoN = req.twoN;
//     var collection = twoN.get('switch');
//     collection.find('ctrl?switch=3&action=trigger',{},function(e,docs){
//         res.json(docs);
//         console.log(docs);
//     });
// });


module.exports = router;
