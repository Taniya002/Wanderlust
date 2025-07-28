const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirctUrl } = require("../middleware.js");
const userControllers=require("../controllers/users.js")

router.get("/signup",userControllers.getSignup)
//sign up
router.post(
    "/signup", 
    wrapAsync(userControllers.SignUP));
//login
router.get("/login",userControllers.getLogin)

router.post("/login",
    saveRedirctUrl,
    passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true
}),userControllers.login
)

//logout
router.get("/logout",userControllers.logout)


module.exports=router;
