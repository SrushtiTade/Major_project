const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
     title:
     {
          type:String,
          required: true,
     },
     description:String,
    image:{
     filename:{
          type:String,
          default:"listingimage"
     },
     url:{
          type:String,
          default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJRx5IRVz6pvmrXKDmxWTITdotd5W6tqheQg&s"
     }
},
     price:Number,
     location:String,
     country:String,
     reviews:[{
         type:Schema.Types.ObjectId,
         ref:"Review",
     }]
});

listingSchema.post("findOneAndDelete", async (listing) =>{
     if(listing){
     await review.deteleMany({_id : {$in: listing.reviews}});
     }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports=Listing;