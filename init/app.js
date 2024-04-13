const initData=require("./data.js");
const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
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

const initDb=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDb();