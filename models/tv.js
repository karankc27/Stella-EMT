const mongoose=require("mongoose");
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const Schema= mongoose.Schema;

const tvSchema=new Schema({
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
  start_year:{
    type: Number,
    required: true
  },
  end_year:{
    type: Number,
  },
  story:{
  type: String
  },
  seasons:{
    type: Number,
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
module.exports= mongoose.model("Tv",tvSchema);
