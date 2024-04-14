const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const mongoose_url="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("Connection to dbs is secured");
})
.catch(err=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(mongoose_url);
}


app.get("/",(req,res)=>{
    res.send("Welcome to the root");
});

app.get("/listing",async(req,res)=>{
     const allListing=await Listing.find({}).then((res)=>{
        res.render("index.ejs",{allListing});
    });
});
// app.get("/testListing",async(req,res)=>{
//     let sampleListing= new Listing({
//         title:"My Villa",
//         description:"New,Affordable and Semi Furnished",
//         price:12000,
//         location:"Goa",
//         country:"India"
//     });

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successful");
// })


app.listen(8080,()=>{
    console.log("Listening to the port 8080");
})




