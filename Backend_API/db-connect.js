const mongoose = require('mongoose');
const dbURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
    try {
        mongoose.connect(dbURI);
        console.log("Connected to Mongo Successfuly");
    } catch (error) {
        console.log(error)
        process.exit()
    }

}


module.exports = connectToMongo;