const router = require('express').Router();
const session = require('express-session');
let User = require('../models/user.model');
const passport = require('../passport');

// login
router.route('/').post(
	passport.authenticate('local'),
	(req, res) => {
		console.log('> ' + req.user.username + ' logged in');
		var userInfo = {
			_id: req.user._id
		};
		res.send(userInfo);
	}
);

// check session
router.route('/').get((req, res) => {
	if (req.user) {
		console.log('> resume session for ' + req.user.username);
		res.json({ user: req.user })
	} else {
		res.json({ user: null })
	}
});

// signup
router.route('/signup').post((req, res) => {
	
	const { username, password, password2 } = req.body;

	User.findOne({ username: username }, (err, user) => {
		if (err) {
			// db error
			res.status(500).json('Error: ' + err);
		} else if (user) {
			// username already used
			res.status(400).json('A user with this username already exists');
		} else if (password !== password2) {
			res.status(400).json('Passwords do not match');
		} else {
			// all good, create user
			const newUser = new User({ username, password });
			newUser.save()
				.then(() => {
					res.json(newUser);
					console.log('> new user created for ' + username);
				})
				.catch(err => res.status(400).json('Error: ' + err));
		}

	});
	
});

//logout
router.route('/logout').post((req, res) => {
	if (req.user) {
		console.log('> ' + req.user.username + ' logged out');
		req.logout();
		res.json('Logged out');
	} else {
		res.status(400).json('No user to log out');
	}
});

module.exports = router;