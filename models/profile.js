const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "",
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    // posts: [
    //     {

    //     }
    // ]
    social: {
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
});

module.exports = mongoose.model('Profile', profileSchema);