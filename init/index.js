const mongoose = require("mongoose");
const initData = require("./data.js")
const Listing = require("../models/listing.js")


main()
.then(console.log("connection established"))
.catch( err =>{console.log(err)});


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wandarlust")
    
}


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, owner:"6846d327f304f187866b2d45",
    }))
    await Listing.insertMany(initData.data)
    console.log("data was initialized")
}

initDB();