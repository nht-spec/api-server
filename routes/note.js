const router = require('express').Router();
const Note = require('../models/Note');

// CREATE NOTE
router.post('/', async (req, res) => {
	const newNote = new Note(req.body);
	try {
		const saveNote = await newNote.save();
		res.status(200).json(saveNote);
	} catch (err) {
		res.status(500).json(err);
	}
});

// UPDATE NOTE
router.put('/:id', async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);
		if (note.username === req.body.username) {
			try {
				const updateNote = await Note.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
					},
					{ new: true }
				);
				res.status(200).json(updateNote);
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json('You can update only your note');
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE NOTE
router.delete('/:id', async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);
		if (note.username === req.body.username) {
			try {
				await note.delete();
				res.status(200).json('Note has been deleted');
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json('You can deleted only your note');
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET NOTE
router.get('/:id', async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);
		res.status(200).json(note);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET ALL NOTE
router.get('/', async (req, res) => {
	const username = req.query.user;
	try {
		let notes;
		if (username) {
			notes = await Note.find({ username });
		} else {
			notes = await Note.find();
		}
		res.status(200).json(notes);
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
