const mongoose=require("mongoose");

const listingModel=new Schema({
    title:String,
    description:String,
    image:String,
    price:Number,
    location:String,
    country:String
});