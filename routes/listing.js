const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const { listingSchema,reviewSchema } = require("../schema.js"); 
const ExpressError=require("../utils/expressError.js")
const Listing=require("../models/listing");

const validatelisting = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(', ');
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

router.get("/",wrapAsync(async(req,res)=>{
  const allListings= await Listing.find({})
       res.render("listings/index.ejs",{allListings})
    }))
    
//new route
router.get("/new",(req,res)=>{
  res.render("listings/new.ejs")
})
//show route
router.get("/:id",
  wrapAsync(async(req,res)=>{
  let{id}=req.params;
  const listing=await Listing.findById(id).populate("reviews");
  res.render("listings/show.ejs",{listing})

}))
//create route
router.post("/",
  validatelisting,
  wrapAsync(async(req,res,next)=>{

  const newListing=new Listing(req.body.listing)
  await newListing.save();
  req.flash("success","New Listing Created !")
  res.redirect("/listings")
  
})
)
//edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
  let{id}=req.params;
  const listing= await Listing.findById(id)
       res.render("listings/edit.ejs",{listing})
  

    }))

//update route
router.put("/:id",wrapAsync(async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash("success"," Listing Updated !")
 res.redirect(`/listings/${id}`)


}))

//delete route
router.delete("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success"," Listing Deleted !")

  res.redirect("/listings");
}));

module.exports=router;