var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var restaurantSchema=new Schema({
  _id : Number,
  resName : String,
  resImage : String,
  resRating : Number,
  resAddress: String,
  resComments:String


});
module.exports=mongoose.model('restaurantDetails',restaurantSchema);
