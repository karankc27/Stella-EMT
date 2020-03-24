const Tv=require("../models/tv");

const Movie=require("../models/movie");

const Edevice=require("../models/edevice");

exports.getAddMovie=(req,res,next) =>{
  if(!req.session.isLoggedIn){
    return res.render("shop/index",{
      errorMessage: "Please Login to continue -->",
      page_title: null
    });
  }
  res.render("admin/add-movie",{
    errorMessage: req.flash(),
    page_title: "Add Movie"
  });
};
  exports.postAddMovie=(req,res,next)=>{
    const genre=[];
    if(req.body.genre0== ""){
      genre.push(req.body.genre0);
    }
    if(req.body.genre1== "Adventure"){
      genre.push(req.body.genre1);
    }
    if(req.body.genre2== "Comedy"){
      genre.push(req.body.genre2);
    }
    if(req.body.genre3== "Horror"){
      genre.push(req.body.genre3);
    }
    if(req.body.genre4== "Thriller"){
      genre.push(req.body.genre4);
    }
    if(req.body.genre5== "Mystery"){
      genre.push(req.body.genre5);
    }
    if(req.body.genre6== "Sci-fi"){
      genre.push(req.body.genre6);
    }
    if(req.body.genre7== "Romance"){
      genre.push(req.body.genre7);
    }
    if(req.body.genre8== "Drama"){
      genre.push(req.body.genre8);
    }
    if(req.body.genre9== "Crime"){
      genre.push(req.body.genre9);
    }
    if(req.body.genre10== "Animation"){
      genre.push(req.body.genre10);
    }
    if(req.body.genre11== "Fantasy"){
      genre.push(req.body.genre11);
    }
    if(req.body.genre12== "Superhero"){
      genre.push(req.body.genre12);
    }
    if(req.body.genre13== "Biography"){
      genre.push(req.body.genre13);
    }
    if(req.body.genre14== "Sports"){
      genre.push(req.body.genre14);
    }
    if(req.body.genre15== "Documentary"){
      genre.push(req.body.genre15);
    }
    if(req.body.genre16== "History"){
      genre.push(req.body.genre16);
    }
    if(req.body.genre17== "Musical"){
      genre.push(req.body.genre17);
    }
    if(req.body.genre18== "Psychological"){
      genre.push(req.body.genre18);
    }

    const trailer=req.body.trailer;
    const name=req.body.name;
    const description=req.body.description;
    const year=req.body.year;
    const rating=req.body.rating;
    const imageurl=req.body.imageurl;
    const story=req.body.story;
    const quantity=req.body.quantity;

    const movie=new Movie({
      quantity:quantity,
      story: story,
      genre: genre,
      name: name,
      description: description,
      year: year,
      rating:rating,
      imageurl: imageurl,
      trailer: trailer
    });
    movie.save()  .then(result => {
      res.render('admin/add-movie',{
        errorMessage: req.flash(),
        page_title: "Add Movie"
      });
    })
    .catch(err => {
      console.log(err);
    });
  };


exports.getAddTvSeries=(req,res,next) =>{
  if(!req.session.isLoggedIn){
    return res.render("shop/index",{
      errorMessage: "Please Login to continue -->",
      page_title: null
    });
  }
  res.render("admin/add-tv-series",{
    errorMessage: req.flash(),
    page_title: "Add TV Series"
  });

};
exports.postAddTvSeries=(req,res,next)=>{
    const genre=[];
    if(req.body.genre0== "Action"){
      genre.push(req.body.genre0);
    }
    if(req.body.genre1== "Adventure"){
      genre.push(req.body.genre1);
    }
    if(req.body.genre2== "Comedy"){
      genre.push(req.body.genre2);
    }
    if(req.body.genre3== "Horror"){
      genre.push(req.body.genre3);
    }
    if(req.body.genre4== "Thriller"){
      genre.push(req.body.genre4);
    }
    if(req.body.genre5== "Mystery"){
      genre.push(req.body.genre5);
    }
    if(req.body.genre6== "Sci-fi"){
      genre.push(req.body.genre6);
    }
    if(req.body.genre7== "Romance"){
      genre.push(req.body.genre7);
    }
    if(req.body.genre8== "Drama"){
      genre.push(req.body.genre8);
    }
    if(req.body.genre9== "Crime"){
      genre.push(req.body.genre9);
    }
    if(req.body.genre10== "Animation"){
      genre.push(req.body.genre10);
    }
    if(req.body.genre11== "Fantasy"){
      genre.push(req.body.genre11);
    }
    if(req.body.genre12== "Superhero"){
      genre.push(req.body.genre12);
    }
    if(req.body.genre13== "Biography"){
      genre.push(req.body.genre13);
    }
    if(req.body.genre14== "Sports"){
      genre.push(req.body.genre14);
    }
    if(req.body.genre15== "Documentary"){
      genre.push(req.body.genre15);
    }
    if(req.body.genre16== "History"){
      genre.push(req.body.genre16);
    }
    if(req.body.genre17== "Musical"){
      genre.push(req.body.genre17);
    }
    if(req.body.genre18== "Psychological"){
      genre.push(req.body.genre18);
    }

    const trailer=req.body.trailer;
   const name=req.body.name;
   const description=req.body.description;
   const start_year=req.body.start_year;
   const rating=req.body.rating;
   const imageurl=req.body.imageurl;
   const end_year=req.body.end_year;
   const seasons=req.body.seasons;
   const quantity=req.body.quantity;


   const tv=new Tv({
     quantity:quantity,
     genre: genre,
     name: name,
     description: description,
     start_year: start_year,
     end_year:end_year,
     rating:rating,
     imageurl: imageurl,
     trailer: trailer,
     seasons: seasons
   });
   tv.save()  .then(result => {
       res.render('admin/add-tv-series',{
         errorMessage: req.flash(),
         page_title: "Add TV Series"
       });
     })
     .catch(err => {
     console.log(err);
     });
 };
 exports.getAddEdevice=(req,res,next) =>{
   if(!req.session.isLoggedIn){
     return res.render("shop/index",{
       errorMessage: "Please Login to continue -->",
       page_title: null
     });
   }
   res.render("admin/add-edevice",{
     errorMessage: req.flash(),
     page_title: "Add Device"
   });

 };
 exports.postAddEdevice=(req,res,next)=>{
    const device_type=req.body.device_type;
    const name=req.body.name;
    const description=req.body.description;
    const year=req.body.year;
    const rating=req.body.rating;
    const imageurl=req.body.imageurl;
    const brand_name=req.body.brand_name;
    const price=req.body.price;
    const model=req.body.model;
    const quantity=req.body.quantity;
    const trailer=req.body.trailer;

    const edevice=new Edevice({
      quantity:quantity,
      device_type: device_type,
      name: name,
      description: description,
      year: year,
      brand_name: brand_name,
      rating:rating,
      imageurl: imageurl,
      price: price,
      trailer: trailer,
      model:model
    });
    edevice.save()  .then(result => {
        res.render('admin/add-edevice',{
          errorMessage: req.flash(),
          page_title: "Add Device"
        });
      })
      .catch(err => {
      console.log(err);
      });
  };


exports.getUpdateMovie=(req,res)=>{
  let id=req.query.id;
  if(id){
    Movie.find({
      _id:id
    })
    .then(movies=>{
      console.log(movies);
      res.render("admin/update-movie",{
        movies:movies,
        _id: id,
        errorMessage: null,
        page_title: "Update Movie"
      });
    })
  }
  else{
    Movie.find()
    .then(movies=>{
      console.log(movies);
      res.render("shop/movies",{
        movies:movies,
        genre:"All",
        errorMessage: "Couldnt Update",
        page_title: "Movies"
      });
    })
  }
};

exports.postUpdateMovie=(req,res)=>{
    const genre=[];
    if(req.body.genre0== ""){
      genre.push(req.body.genre0);
    }
    if(req.body.genre1== "Adventure"){
      genre.push(req.body.genre1);
    }
    if(req.body.genre2== "Comedy"){
      genre.push(req.body.genre2);
    }
    if(req.body.genre3== "Horror"){
      genre.push(req.body.genre3);
    }
    if(req.body.genre4== "Thriller"){
      genre.push(req.body.genre4);
    }
    if(req.body.genre5== "Mystery"){
      genre.push(req.body.genre5);
    }
    if(req.body.genre6== "Sci-fi"){
      genre.push(req.body.genre6);
    }
    if(req.body.genre7== "Romance"){
      genre.push(req.body.genre7);
    }
    if(req.body.genre8== "Drama"){
      genre.push(req.body.genre8);
    }
    if(req.body.genre9== "Crime"){
      genre.push(req.body.genre9);
    }
    if(req.body.genre10== "Animation"){
      genre.push(req.body.genre10);
    }
    if(req.body.genre11== "Fantasy"){
      genre.push(req.body.genre11);
    }
    if(req.body.genre12== "Superhero"){
      genre.push(req.body.genre12);
    }
    if(req.body.genre13== "Biography"){
      genre.push(req.body.genre13);
    }
    if(req.body.genre14== "Sports"){
      genre.push(req.body.genre14);
    }
    if(req.body.genre15== "Documentary"){
      genre.push(req.body.genre15);
    }
    if(req.body.genre16== "History"){
      genre.push(req.body.genre16);
    }
    if(req.body.genre17== "Musical"){
      genre.push(req.body.genre17);
    }
    if(req.body.genre18== "Psychological"){
      genre.push(req.body.genre18);
    }

    const updatedName=req.body.name;
    const updatedDesc=req.body.description;
    const updatedYear=req.body.year;
    const updatedImageUrl=req.body.imageurl;
    const id=req.body.id;
    const story=req.body.story;
    const trailer=req.body.trailer;

    console.log(id);

    Movie.findById(id)
    .then(movie => {
      console.log(movie);
      movie.story= story;
      movie.name = updatedName;
      movie.year = updatedYear;
      movie.description = updatedDesc;
      movie.imageurl = updatedImageUrl;
      movie.genre=genre;
      movie.trailer= trailer;
      console.log(movie);
      return movie.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/movies?genre=all');
    })
    .catch(err => console.log(err));
  };

exports.getDeleteMovie=(req,res)=>{

  let id=req.query.id;
  Movie.findByIdAndRemove(id)
  .then(() => {
    console.log('Deleted Movie');
    res.redirect('/movies');
  })
  .catch(err => console.log(err));

};




exports.getUpdateTvSeries=(req,res)=>{
  let id=req.query.id;
  if(id){
    Tv.find({
      _id:id
    })
    .then(tvs=>{
      console.log(tvs);
      res.render("admin/update-tv-series",{
        tvs:tvs,
        _id: id,
        errorMessage: req.flash(),
        page_title: "Update Tv Series"
      });
    })
  }
  else{
    Tv.find()
    .then(tvs=>{
      console.log(tvs);
      res.render("shop/tvs",{
        tvs:tvs,
        genre:"All",
        errorMessage: "Couldnt Update",
        page_title: "Tv Series"
      });
    })
  }
};

exports.postUpdateTvSeries=(req,res)=>{
    const genre=[];
    if(req.body.genre0== ""){
      genre.push(req.body.genre0);
    }
    if(req.body.genre1== "adventure"){
      genre.push(req.body.genre1);
    }
    if(req.body.genre2== "comedy"){
      genre.push(req.body.genre2);
    }
    if(req.body.genre3== "horror"){
      genre.push(req.body.genre3);
    }
    if(req.body.genre4== "thriller"){
      genre.push(req.body.genre4);
    }
    if(req.body.genre5== "mystery"){
      genre.push(req.body.genre5);
    }
    if(req.body.genre6== "sci-fi"){
      genre.push(req.body.genre6);
    }
    if(req.body.genre7== "romance"){
      genre.push(req.body.genre7);
    }
    if(req.body.genre8== "drama"){
      genre.push(req.body.genre8);
    }
    if(req.body.genre9== "crime"){
      genre.push(req.body.genre9);
    }
    if(req.body.genre10== "animation"){
      genre.push(req.body.genre10);
    }
    if(req.body.genre11== "fantasy"){
      genre.push(req.body.genre11);
    }
    if(req.body.genre12== "superhero"){
      genre.push(req.body.genre12);
    }
    if(req.body.genre13== "biography"){
      genre.push(req.body.genre13);
    }
    if(req.body.genre14== "sports"){
      genre.push(req.body.genre14);
    }
    if(req.body.genre15== "documentary"){
      genre.push(req.body.genre15);
    }
    if(req.body.genre16== "history"){
      genre.push(req.body.genre16);
    }
    if(req.body.genre17== "musical"){
      genre.push(req.body.genre17);
    }
    if(req.body.genre18== "psychological"){
      genre.push(req.body.genre18);
    }

    const story=req.body.story;
    const trailer=req.body.trailer;
    const updatedName=req.body.name;
    const updatedDesc=req.body.description;
    const updatedStartYear=req.body.start_year;
    const updatedEndYear=req.body.end_year;
    const updatedRating=req.body.rating;
    const updatedImageUrl=req.body.imageurl;
    const seasons=req.body.seasons;
    const id=req.body.id;
    console.log(id);

    Tv.findById(id)
    .then(tv => {
      console.log(tv);
      tv.name = updatedName;
      tv.start_year = updatedStartYear;
      tv.end_year =updatedEndYear;
      tv.description = updatedDesc;
      tv.imageurl = updatedImageUrl;
      tv.rating=updatedRating;
      tv.genre=genre;
      tv.seasons=seasons;
      tv.trailer=trailer;
      tv.story=story;

      console.log(tv);
      return tv.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/tvshows?genre=all');
    })
    .catch(err => console.log(err));
  };

exports.getDeleteTvSeries=(req,res)=>{

  let id=req.query.id;
  Tv.findByIdAndRemove(id)
  .then(() => {
    console.log('Deleted Tv Series');
    res.redirect('/tvshows');
  })
  .catch(err => console.log(err));

};




exports.getUpdateEdevice=(req,res)=>{
  let id=req.query.id;
  if(id){
    Edevice.find({
      _id:id
    })
    .then(edevices=>{
      console.log(edevices);
      res.render("admin/update-edevice",{
        edevices:edevices,
        _id: id,
        errorMessage: req.flash(),
        page_title: "Update Device"
      });
    })
  }
  else{
    Edevice.find()
    .then(edevices=>{
      console.log(edevices);
      res.render("shop/devices",{
        edevices:edevices,
        device_type:"All",
        errorMessage: "Couldn't Update"
      });
    })
  }
};

exports.postUpdateEdevice=(req,res)=>{
    const device_type=req.body.device_type;
    const updatedName=req.body.name;
    const updatedBrandName=req.body.brand_name;
    const updatedPrice=req.body.price;
    const updatedModel=req.body.model;
    const updatedDesc=req.body.description;
    const updatedYear=req.body.year;
    const updatedRating=req.body.rating;
    const updatedImageUrl=req.body.imageurl;
    const id=req.body.id;
    const trailer=req.body.trailer;

    console.log(id);

    Edevice.findById(id)
    .then(edevice => {
      console.log(edevice);
      edevice.name = updatedName;
      edevice.brand_name=updatedBrandName;
      edevice.price=updatedPrice;
      edevice.model=updatedModel;
      edevice.year = updatedYear;
      edevice.description = updatedDesc;
      edevice.imageurl = updatedImageUrl;
      edevice.rating=updatedRating;
      edevice.device_type=device_type;
      edevice.trailer=trailer;
      console.log(edevice);
      return edevice.save();
    })
    .then(result => {
      console.log('UPDATED Device!');
      res.redirect('/devices');
    })
    .catch(err => console.log(err));
  };

exports.getDeleteEdevice=(req,res)=>{

  let id=req.query.id;
  Edevice.findByIdAndRemove(id)
  .then(() => {
    console.log('Deleted Device');
    res.redirect('/devices');
  })
  .catch(err => console.log(err));

};
