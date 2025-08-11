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
    url:String,
    filename:String
},
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
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
category: {
  type: String,
  enum: ['Mountains', 'Camping', 'Farms', 'Rooms','Desert','castles','forest','pools','arctic'], 
  required: true
}
})
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;