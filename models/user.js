const mongoose=require("mongoose");

const Schema= mongoose.Schema;

const userSchema=new Schema({
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  phone:{
    type: String,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  movies: {
    items: [
      {
        movieId: {
          type: Schema.Types.ObjectId,
          ref: 'Movie'
        },
        moviequantity: { type: Number },
        }
    ]
  },

  tvs: {
    items: [
      {
        tvId: {
          type: Schema.Types.ObjectId,
          ref: 'Tv'
        },
        tvquantity: { type: Number },
        }
    ]
  },

  devices:{
    items: [
      {
        deviceId: {
          type: Schema.Types.ObjectId,
          ref: 'Edevice'
        },
        devicequantity: { type: Number },
        }
    ]

  }
});

userSchema.methods.addMovieToMovies = function(movie,rate) {
  const moviesMovieIndex = this.movies.items.findIndex(cp => {
    return cp.movieId.toString() === movie._id.toString();
  });
  let newQuantity = 1;
  const updatedMoviesItems = [...this.movies.items];

  if (moviesMovieIndex >= 0) {
    newQuantity = this.movies.items[moviesMovieIndex].quantity + 1;
    updatedMoviesItems[moviesMovieIndex].quantity = newQuantity;
  } else {
    updatedMoviesItems.push({
      movieId: movie._id,
      quantity: newQuantity,
      moviequantity: rate,
    });
  }
  const updatedMovies = {
    items: updatedMoviesItems
  };
  this.movies = updatedMovies;
  return this.save();
};


userSchema.methods.addTvToTvs = function(tv,rate) {
  const tvsTvIndex = this.tvs.items.findIndex(cp => {
    return cp.tvId.toString() === tv._id.toString();
  });
  let newQuantity = 1;
  const updatedTvsItems = [...this.tvs.items];

  if (tvsTvIndex >= 0) {
    newQuantity = this.tvs.items[tvsTvIndex].quantity + 1;
    updatedTvsItems[tvsTvIndex].quantity = newQuantity;
  } else {
    updatedTvsItems.push({
      tvId: tv._id,
      quantity: newQuantity,
      tvquantity: rate,
    });
  }
  const updatedTvs = {
    items: updatedTvsItems
  };
  this.tvs = updatedTvs;
  return this.save();
};


userSchema.methods.addDeviceToDevices = function(device,rate) {
  const devicesDeviceIndex = this.devices.items.findIndex(cp => {
    return cp.deviceId.toString() === device._id.toString();
  });
  let newQuantity = 1;
  const updatedDevicesItems = [...this.devices.items];

  if (devicesDeviceIndex >= 0) {
    newQuantity = this.devices.items[devicesDeviceIndex].quantity + 1;
    updatedDevicesItems[devicesDeviceIndex].quantity = newQuantity;
  } else {
    updatedDevicesItems.push({
      deviceId: device._id,
      quantity: newQuantity,
      devicequantity: rate,
    });
  }
  const updatedDevices = {
    items: updatedDevicesItems
  };
  this.devices = updatedDevices;
  return this.save();
};

module.exports = mongoose.model('User',userSchema);
