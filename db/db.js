const mongoose = require('mongoose');
const config = require('config');
const db = require('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(bd, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected");
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.export = connectDB;