const express= require("express");

const router=express.Router();
const authController=require("../controllers/auth");

router.post('/login', authController.postLogin);

router.get("/", authController.getIndex);

router.post('/signup', authController.postSignup);

router.get('/logout', authController.getLogout);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

router.get("/activate", authController.getActivate);


module.exports=router;
