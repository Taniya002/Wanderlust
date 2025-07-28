const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/expressError.js")
const { listingSchema,reviewSchema } = require('../schema.js'); 
const { isLoggedIn, isReviewAuthor, deleteReview } = require("../middleware.js");
const reviewController=require("../controllers/reviews.js")

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(', ');
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


//reviews post route
router.post("/",
   isLoggedIn,
     validateReview, 
     wrapAsync(reviewController.createReview));



//delete review route
router.delete("/:reviewID",isLoggedIn,isReviewAuthor,
  wrapAsync(reviewController.deleteReview))

module.exports=router;