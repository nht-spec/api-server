const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		note: {
			type: String,
			required: true,
		},

		time: {
			type: String,
			required: true,
		},

		username: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
