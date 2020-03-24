const mongoose=require("mongoose");
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const Schema= mongoose.Schema;

const edeviceSchema=new Schema({
  device_type:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },

  trailer:{
    type: String
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
  year:{
    type: Number,
    required: true
  },
  brand_name:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  model:{
    type: String
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  quantity:{
    type: Number
  }
});
module.exports= mongoose.model("Edevice",edeviceSchema);
