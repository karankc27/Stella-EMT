const mongoose=require("mongoose");
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const Schema= mongoose.Schema;

const movieSchema=new Schema({
  genre:{
    type: Array,
    required: true
  },
  trailer:{
    type: String
  },
  name:{
    type: String,
    required: true
  },
  imageurl:{
    type: String,
    required: true
  },
  rating:{
    type: SchemaTypes.Double,
    max: 10,
    min:0,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  story:{
  type: String
  },
  year:{
    type: Date,
    required: true
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  quantity:{
    type: Number
  }
});
module.exports= mongoose.model("Movie",movieSchema);
