const mongoose = require('mongoose');
const dbURI = "mongodb://localhost:27017";

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(dbURI);
        console.log("Connected to Mongo Successfuly");
    } catch (error) {
        console.log(error)
        process.exit()
    }

}


module.exports = connectToMongo;