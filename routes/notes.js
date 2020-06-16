const router = require('express').Router();
let Note = require('../models/note.model');

// Get all notes by a single user
router.route('/byuser/:id').get((req, res) => {
	Note.find(({ userId: req.params.id })).sort({ updatedAt: -1 })
		.then(notes => {
			res.json(notes);
			console.log('> got notes for ' + req.user.username);
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

// Add note
router.route('/add').post((req, res) => {

	const { userId, content } = req.body;
	const title = req.body.title ? req.body.title : 'Untitled';

	const newNote = new Note({
		userId,
		title,
		content
	});

	newNote.save()
		.then(() => {
			res.json(newNote);
			console.log('> ' + req.user.username + ' created a new note');
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

// Update note
router.route('/update/:id').put((req, res) => {
	Note.findById(req.params.id)
		.then(note => {
			note.userId = req.body.userId;
			note.title = req.body.title;
			note.content = req.body.content;

			note.save()
				.then(() => {
					res.json('Note updated!');
					console.log('> ' + req.user.username + ' updated a note');
				})
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

// Delete note
router.route('/delete/:id').delete((req, res) => {
	Note.findByIdAndDelete(req.params.id)
		.then(() => {
			res.json('Note deleted!');
			console.log('> ' + req.user.username + ' deleted a note');
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;