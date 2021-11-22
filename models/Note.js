const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema(
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

		username: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Note', NoteSchema);
