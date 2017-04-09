var express = require('express');
var router = express.Router();
var Rest=require('./restaurantschema');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/add',function(req,res)
{
  var rest=new Rest(req.body);
  rest.save(function(err,data){
  if(err)
    res.send(err);
  else
  res.send(data);
  });
});
router.get('/display',function(req,res){
Rest.find({},function(err,data){
if(err)
  res.send(err);
else {
  res.send(data);
}
});
});

router.put('/update',function (req,res) {
  Rest.update({_id:req.body._id},{$set:{resComments:req.body.resComments}},function (err,data) {
    if(err)
      res.send(err);
    else {
      res.send(data);
    }
  })
});

router.delete('/delete',function (req,res) {
  Rest.remove({_id:req.body._id},function (err,data) {
    if(err)
      res.send(err);
    else {
      res.send(data);
      console.log("one row delete");
    }
  });
});

module.exports = router;
