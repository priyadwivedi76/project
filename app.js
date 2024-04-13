const express=require("express");
const app=express();
const mongoose=require("mongoose");


const mongoose_url="mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(mongoose_url);
}

main()
.then(()=>{
    console.log("Connection to dbs is secured");
})
.catch(err=>{
    console.log(err);
})
app.listen(8080,()=>{
    console.log("Listening to the port 8080");
})

app.get("/",(req,res)=>{
    res.send("Welcome to the root");
})
