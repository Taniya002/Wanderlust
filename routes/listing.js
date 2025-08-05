const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const { listingSchema,reviewSchema } = require("../schema.js"); 
const ExpressError=require("../utils/expressError.js")
const Listing=require("../models/listing");
const {isLoggedIn, isOwner, validatelisting}=require("../middleware.js")
const listingControllers=require("../controllers/index.js")
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage })

router.get("/",wrapAsync(listingControllers.index))
    
//new route
router.get("/new",isLoggedIn,listingControllers.listingRender)

//show route
router.get("/:id",
  wrapAsync(listingControllers.showlisting))

// create route
router.post("/",
   isLoggedIn, 
  validatelisting,
  upload.single('listing[image]'),
 wrapAsync(listingControllers.createlisting)

)



//edit route
router.get("/:id/edit",isLoggedIn,isOwner, 
  wrapAsync(listingControllers.editListing))

//update route
router.put("/:id",
  isLoggedIn,
  isOwner,
   upload.single('image'),
   validatelisting,
   wrapAsync(listingControllers.updateListing))

//delete route
router.delete("/:id",
  isLoggedIn,
   isOwner, 
 
  wrapAsync(listingControllers.deleteListing));


module.exports=router;