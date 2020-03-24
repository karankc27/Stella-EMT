const express=require("express");
const adminController=require("../controllers/admin");
const router=express.Router();
//const isAdmin= require("../middleware/is-admin");


router.get("/add-movie", adminController.getAddMovie);

router.post("/add-movie", adminController.postAddMovie);

router.get("/add-tv-series", adminController.getAddTvSeries);

router.post("/add-tv-series", adminController.postAddTvSeries);

router.get("/add-edevice", adminController.getAddEdevice);

router.post("/add-edevice", adminController.postAddEdevice);

router.get("/update-movie", adminController.getUpdateMovie);

router.post("/update-movie", adminController.postUpdateMovie);

router.get("/delete-movie", adminController.getDeleteMovie);

router.get("/update-tv-series", adminController.getUpdateTvSeries);

router.post("/update-tv-series", adminController.postUpdateTvSeries);

router.get("/delete-tv-series", adminController.getDeleteTvSeries);

router.get("/update-edevice", adminController.getUpdateEdevice);

router.post("/update-edevice", adminController.postUpdateEdevice);

router.get("/delete-edevice", adminController.getDeleteEdevice);


module.exports=router;
