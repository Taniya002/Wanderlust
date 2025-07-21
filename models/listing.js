const mongoose =require("mongoose");
const Review = require("./review");
const Schema =mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
    },
 image: {
  filename: String,
  url: {
    type: String,
    default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3...",
    set: (v) =>
      v === "" ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3..." : v,
  }
}
,
price:{
    type: Number,
    require:true,
    min: 0,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"review",
    }]
})
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;