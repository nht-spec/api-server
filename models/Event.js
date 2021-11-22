const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		desc: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},

		status: {
			type: Array,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
