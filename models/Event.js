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
		date: {
			type: String,
			required: true,
		},
		mintime: {
			type: Number,
			required: true,
		},
		maxtime: {
			type: Number,
			required: true,
		},
		rangetime: {
			type: Object,
			required: true,
		},
		color: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
