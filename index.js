const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const mongoose_url="mongodb://127.0.0.1:27017/wanderlust";
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/expressError.js");
const { wrap } = require("module");

//connect db
main()
.then(()=>{
    console.log("Connection to dbs is secured");
})
.catch(err=>{
    console.log(err);
});


async function main() {
    await mongoose.connect(mongoose_url);
}


app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("Welcome to the root");
});

//index route
app.get("/listings",wrapAsync(async (req,res)=>{
    const allListing=await Listing.find({});
    // console.log("done");
   res.render("listing/index.ejs",{ allListing });
}));

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listing/new.ejs");
});

//show route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listing/show.ejs",{listing});
}));

//create route
app.post("/listings",wrapAsync(async(req,res,next)=>{
    if(!req.body.listing){
        new ExpressError(400,"Send Valid data");
    }
        const newListing=new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
})
);

//edit route
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listing/edit.ejs",{listing});
}));

//update route
app.put("/listings/:id",wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        new ExpressError(400,"Send Valid data");
    }
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");

}));

//error handler
app.use("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
})

app.use((err,req,res,next)=>{
   let {status=500,message="Something went wrong!"}=err;
  res.status(status).render("error.ejs",{message});
})

app.listen(8080,()=>{
    console.log("Listening to the port 8080");
});




