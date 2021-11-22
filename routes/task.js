const router = require('express').Router();
const Task = require('../models/Task');

// CREATE TASK
router.post('/', async (req, res) => {
	const newTask = new Task(req.body);
	try {
		const saveTask = await newTask.save();
		res.status(200).json(saveTask);
	} catch (err) {
		res.status(500).json(err);
	}
});

// UPDATE TASK
router.put('/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (task.username === req.body.username) {
			try {
				const updateTask = await Task.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
					},
					{ new: true }
				);
				res.status(200).json(updateTask);
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json('You can update only your task');
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE
router.delete('/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (task.username === req.body.username) {
			try {
				await task.delete();
				res.status(200).json('Task has been deleted');
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json('You can deleted only your task');
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET TASK
router.get('/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		res.status(200).json(task);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET ALL TASK

router.get('/', async (req, res) => {
	const username = req.query.user;

	try {
		let tasks;
		if (username) {
			tasks = await Task.find({ username });
		} else {
			tasks = await Task.find();
		}
		res.status(200).json(tasks);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
