const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: Buffer,
		// res: "photo"
		default: 'photo'
	},
	imageType: {
		type: String
	},
    likes: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
			}}
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }}
    ],
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
	},
	{timestamps: true}
);

module.exports = mongoose.model('Post', postSchema);