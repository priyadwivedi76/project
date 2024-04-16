const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const { removeAllListeners } = require("process");
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
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.send("Welcome to the root");
});

//index route
app.get("/listings",async(req,res)=>{
    const allListing=await Listing.find({});
    // console.log("done");
   res.render("listing/index.ejs",{ allListing });
});


//show route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listing/show.ejs",{listing});
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




