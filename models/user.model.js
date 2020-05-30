const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlenght: 3
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);