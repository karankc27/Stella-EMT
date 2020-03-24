const Movie=require("../models/movie");
const Tv=require("../models/tv");
const Edevice=require("../models/edevice");
const User=require("../models/user");
var mongoose=require("mongoose");
mongoose.Promise = require('bluebird');

const nodemailer=require('nodemailer');
const sendgridTransport=require("nodemailer-sendgrid-transport");

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key: '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'
  }
}));


const ITEMS_PER_PAGE = 5;

exports.getMovies=(req,res)=>{
  const page = +req.query.page || 1;
  let totalItems;

  let genre=req.query.genre;
  if(genre!="all"){
    Movie.find({
      genre:genre
    })
    .sort({
      rating: 'desc'
    })
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Movie.find({
        genre: genre
      }).sort({
        rating: 'desc'
      })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(movies=>{
      // console.log(movies);
      res.render("shop/movies",{
        movies:movies,
        genre:genre,
        errorMessage: null,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        totalItems: totalItems,
        page_title: "Movies"

      });
    })
  }
  else{
    Movie.find()
    .sort({
      rating: 'descending'
    })
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Movie.find().sort({
        rating: 'desc'
      })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(movies=>{
      // console.log(movies);
      res.render("shop/movies",{
        movies:movies,
        genre:"all",
        errorMessage: null,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        totalItems: totalItems,
        page_title: "Movies"
      });
    })
  }
};

exports.getTvs=(req,res)=>{
  const page = +req.query.page || 1;
  let totalItems;

  let genre=req.query.genre;
  if(genre!="all"){
    Tv.find({
      genre:genre
    }).sort({
      rating: 'desc'
    })

    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Tv.find({
        genre: genre
      }).sort({
        rating: 'desc'
      })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(tvs=>{
      console.log(tvs);
      res.render("shop/tvs",{
        tvs:tvs,
        genre:genre,
        errorMessage: null,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        totalItems: totalItems,
        page_title: "TV Series"

      });
    })
  }
  else{
    Tv.find().sort({
      rating: 'desc'
    })

    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Tv.find().sort({
        rating: 'desc'
      })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(tvs=>{
      console.log(tvs);
      res.render("shop/tvs",{
        tvs:tvs,
        genre: "all",
        errorMessage: null,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        totalItems: totalItems,
        page_title: "TV Series"

      });
    })
  }
};



exports.getDevices=(req,res)=>{
  const page = +req.query.page || 1;
  let totalItems;

  let device_type=req.query.device_type;
  if(device_type!="all"){
    Edevice.find({
      device_type:device_type
    }).sort({
      rating: 'desc'
    })

    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Edevice.find({
        device_type: device_type
      }).sort({
        rating: 'desc'
      })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(edevices=>{
      console.log(edevices);
      res.render("shop/edevices",{
        edevices:edevices,
        device_type:device_type,
        errorMessage: null,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        totalItems: totalItems,
        page_title: "Devices"

      });
    })
  }
  else{
    Edevice.find().sort({
      rating: 'desc'
    })

        .countDocuments()
        .then(numProducts => {
          totalItems = numProducts;
          return Edevice.find().sort({
            rating: 'desc'
          })
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        })

    .then(edevices=>{
      console.log(edevices);
      res.render("shop/edevices",{
        edevices:edevices,
        device_type:"all",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        errorMessage: null,
        totalItems: totalItems,
        page_title: "Devices"
      });
    })
  }
};

exports.getSingleMovie=(req,res)=>{
  let id=req.query.id;
  Movie.findById(id)
  .then(movie=>{
    res.render("shop/single-movie",{
      id: id,
      movie: movie,
      errorMessage: null,
      page_title: movie.name
    })
  })
}


exports.getUserMovieRating = (req, res, next) => {
  req.user
    .populate('movies.items.movieId')
    .execPopulate()
    .then(user => {
      const movies = user.movies.items;
      res.render('shop/user-movies', {
        pageTitle: 'Your Movies',
        movies: movies,
        errorMessage: null,
        page_title: "User Movies"
      });
    })
    .catch(err => console.log(err));

};

exports.postUserMovieRating = (req, res) => {

  const movieId = req.body.movieId;
  let rate=parseInt(req.body.star);
  console.log(movieId);
  console.log(req.session.user._id);
  console.log(rate);

  Movie.findById(movieId)
    .then(movie => {

      var num=movie.quantity;
      let x=movie.rating;
      x= x*num;
      x=x+rate;
      x=x/(num+1);
      movie.rating=x.toFixed(1);
      num=num+1
      movie.quantity=num;

      movie.save();

      console.log(movie.quantity+"Movie Quant");
      console.log(movie.rating+"Movie Rating");

      return req.user.addMovieToMovies(movie,rate);

    })
    .then(result => {
      res.redirect('/movies?genre=all');
    });
}

exports.postUserTvRating=(req,res)=>{

    const tvId = req.body.tvId;
    let rate=parseInt(req.body.star);
    console.log(tvId);
    console.log(req.session.user._id);
    console.log(rate)
    Tv.findById(tvId)
      .then(tv => {

        var num=tv.quantity;
        let x=tv.rating;
        x= x*num;
        x=x+rate;
        x=x/(num+1);
        tv.rating=x.toFixed(1);
        num=num+1
        tv.quantity=num;

        tv.save();
        req.user.addTvToTvs(tv, rate);

      })
      .then(result => {
        res.redirect('/tvshows?genre=all');
      });
}


exports.getUserTvRating = (req, res, next) => {
  req.user
    .populate('tvs.items.tvId')
    .execPopulate()
    .then(user => {
      const tvs = user.tvs.items;
      res.render('shop/user-tvs', {
        pageTitle: 'Your Tvs',
        tvs: tvs,
        errorMessage: null,
        page_title: "User's Tv Series"
      });
    })
    .catch(err => console.log(err));

};

exports.postUserDeviceRating=(req,res)=>{

        const deviceId = req.body.deviceId;
        let rate=parseInt(req.body.star);
        console.log(deviceId);
        console.log(req.session.user._id);
        console.log(rate)
        Edevice.findById(deviceId)
          .then(device => {

            var num=device.quantity;
            let x=device.rating;
            x= x*num;
            x=x+rate;
            x=x/(num+1);
            device.rating=x.toFixed(1);
            num=num+1
            device.quantity=num;

            device.save();
            return req.user.addDeviceToDevices(device, rate);

          })
          .then(result => {
            res.redirect('/devices?device_type=all');
          });

}


exports.getUserDeviceRating = (req, res, next) => {
  req.user
    .populate('devices.items.deviceId')
    .execPopulate()
    .then(user => {
      const devices = user.devices.items;
      res.render('shop/user-devices', {
        pageTitle: 'Your Devices',
        devices: devices,
        errorMessage: null,
        page_title: "Your Devices"
      });
    })
    .catch(err => console.log(err));

};

exports.getSingleTv=(req,res)=>{
  let id=req.query.id;
  Tv.findById(id)
  .then(tv=>{
    res.render("shop/single-tv",{
      id: id,
      tv: tv,
      errorMessage: null,
      page_title: tv.name
    })
  })
}


exports.getSingleDevice=(req,res)=>{
  let id=req.query.id;
  Edevice.findById(id)
  .then(device=>{
    res.render("shop/single-device",{
      id: id,
      device: device,
      errorMessage: null,
      page_title: device.name
    })
  })
}

exports.getAutoCompleteMovies= (req,res) =>{
  var result=[];
  var regex= new RegExp(req.query["term"],'i');
  console.log(regex);
  Movie.find({
    name: regex
  })
  .limit(2)
  .exec()
  .then(movies=>{

    if(movies && movies.length && movies.length>0){
      movies.forEach(movie=>{
        let obj={
          id: movie._id,
          label: movie.name
        };
        result.push(obj);
      });
    }
    res.json(result);
  })

}

exports.getAutoCompleteTvs= (req,res) =>{
  var result=[];
  var regex= new RegExp(req.query["term"],'i');
  console.log(regex);
  Tv.find({
    name: regex
  })
  .limit(2)
  .exec()
  .then(movies=>{

      if(movies && movies.length && movies.length>0){
        movies.forEach(movie=>{
          let obj={
            id: movie._id,
            label: movie.name
          };
          result.push(obj);
        });
    }
    res.json(result);
  })

}


exports.getAutoCompleteDevices= (req,res) =>{
  var result=[];
  var regex= new RegExp(req.query["term"],'i');
  console.log(regex);
  Edevice.find({
    name: regex
  })
  .limit(2)
  .exec()
  .then(movies=>{

      if(movies && movies.length && movies.length>0){
        movies.forEach(movie=>{
          let obj={
            id: movie._id,
            label: movie.name
          };
          result.push(obj);
        });
    }
    res.json(result);
  })

}

exports.getContact= (req,res)=>{
  res.render("shop/contact",{
    errorMessage: null,
    page_title: "Contact Us"
  });
}
exports.postContact= (req,res)=>{
  const fname=req.body.fname;
  const lname=req.body.lname;
  const fullname=fname+lname;
  const email=req.body.email;
  const subject=req.body.subject;
  const message=req.body.message;

          transporter.sendMail({
            to: 'karankaramchandani5@gmail.com',
            from: email,
            subject: subject,
            html: `<h1> Name: ${fullname} <br> ${message}</h1>
            `
          })

              res.render("shop/contact",{
                errorMessage: "Mail sent successfully",
                page_title: "Contact Us"
              });
}

exports.getAbout=(req,res)=>{
  res.render("shop/about",{
    errorMessage: null,
    page_title: "About Us"
  })
}
