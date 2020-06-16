const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		unique: false,
		trim: true
	}
}, {
	timestamps: true
});

userSchema.methods = {

	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},

	hashPassword: function (plainTextPassword) {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
	
}

userSchema.pre('save', function (next) {
	this.password = this.hashPassword(this.password);
	next();
})

module.exports = mongoose.model('User', userSchema);