const mongoose = require("mongoose");
require("dotenv").config();

const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri)
.then(() => console.log("Successfully connected to MongoDB!"))
.catch(error => console.log(`Error occured while connecting to MongoDB: ${error}`));

module.exports = mongoose.connection;