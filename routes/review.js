const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/expressError.js")
const Review=require("../models/review.js")
const { listingSchema,reviewSchema } = require('../schema.js'); 
const Listing=require("../models/listing");

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
     validateReview, 
     wrapAsync(async (req, res) => {
 

  if (!req.body.review) {
    throw new ExpressError(400, "Review data is missing.");
  }

  const listing = await Listing.findById(req.params.id);
  const newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success"," New Review Created !")

  res.redirect(`/listings/${listing._id}`);
}));



//delete review route
router.delete("/:reviewID",wrapAsync(async(req,res)=>{
  let {id,reviewID}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewID}});
 await Review.findByIdAndDelete(reviewID)
  req.flash("success"," Review Deleted !")

  res.redirect(`/listings/${id}`)
}))

module.exports=router;