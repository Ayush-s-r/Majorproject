const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;
const Review = require("./review.js")


const imageSchema = new Schema( 
    {
    filename: {
        type: String,
        default: "listingimage",
    },
    url: {
        type: String,
        default: "https://unsplash.com/photos/blurred-figure-walking-in-front-of-a-bright-wall-UCAIwc2-pbQ",
        set: (v) => v=== "" ? "https://unsplash.com/photos/blurred-figure-walking-in-front-of-a-bright-wall-UCAIwc2-pbQ" : v,
        },
    
     }, { _id:false});

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image:imageSchema,
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
        
    
});

listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
    
});




const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;