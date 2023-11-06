//importing required Dependencies
const mongoose = require('mongoose');

//Function to connect to MongoDb
const connectToMongoose = ()=>{

// Define the connection URI
const uri = 'mongodb://127.0.0.1:27017/localecommerce'; // Replace with your actual MongoDB URI

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection is successful.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

}


module.exports = connectToMongoose;

