const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
	function(username, password, done) {
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false);
			}
			if (!user.checkPassword(password)) {
				return done(null, false);
			}
			return done(null, user)
		})
	}
)

module.exports = strategy