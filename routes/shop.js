const path=require("path");
const express=require("express");
const router=express.Router();
const shopController=require("../controllers/shop");


router.get("/movies", shopController.getMovies);

router.get("/tvshows", shopController.getTvs);

router.get("/devices", shopController.getDevices);

router.get("/single-movie", shopController.getSingleMovie);

router.get("/user-movies", shopController.getUserMovieRating);

router.get("/user-tvs", shopController.getUserTvRating);

router.get("/user-devices", shopController.getUserDeviceRating);

router.post("/user-ratings", shopController.postUserMovieRating);

router.post("/user-ratings-tv", shopController.postUserTvRating);

router.post("/user-ratings-device", shopController.postUserDeviceRating);

router.get("/single-tv", shopController.getSingleTv);

router.get("/single-device", shopController.getSingleDevice);

router.get("/autocompletemovies/", shopController.getAutoCompleteMovies);

router.get("/autocompletetvs/", shopController.getAutoCompleteTvs);

router.get("/autocompletedevices/", shopController.getAutoCompleteDevices);

router.get("/contact", shopController.getContact);

router.post("/contact", shopController.postContact);

router.get("/about", shopController.getAbout);
module.exports = router;
