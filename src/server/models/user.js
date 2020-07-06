const mongoose = require('mongoose');
//each mongoose starts from schema, which maps to a MongoDB and
// and defines shape of the doc within that collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
	},
	resetToken: {
		type: String
	},
	expirationToken: {
		type: Date
	}
});

//compile schema onto a model and export
module.exports = mongoose.model('User', userSchema);
//model is a class with which we construct docs.
//in this case, each doc will be an User with properties
//we declared in our schema.