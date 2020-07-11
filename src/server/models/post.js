const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body:{
		type: String,
		required: true
	},
    image: {
        type: String,
		// res: "photo"
		required: true
	},
	postedBy: {
        type: ObjectId,
        ref: "User"
    }
	// imageType: {
	// 	type: String
	// }
    // likes: [{
    //         user: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "User"
	// 		}}
    // ],
    // comments: [
    //     {
    //         user: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "User"
    //         },
    //         text: {
    //             type: String,
    //             required: true
    //         },
    //         date: {
    //             type: Date,
    //             default: Date.now
    //         }}
    // ],
    // // date: {
    // //     type: Date,
    // //     default: Date.now
    // // }
	// },
	// {timestamps: true}
});

module.exports = mongoose.model('Post', postSchema);