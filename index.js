const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const eventRoute = require('./routes/event');
const noteRoute = require('./routes/note');
const taskRoute = require('./routes/task');
const multer = require('multer');
const app = express();

dotenv.config();

app.use(express.json());

mongoose
	.connect(process.env.MONGO_URL)
	.then(console.log('conect to mongo'))
	.catch((err) => console.log(err));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

app.get('/', (req, res) => res.send('api-node'));

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
	res.status(200).json('File has been upload');
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/events', eventRoute);
app.use('/api/notes', noteRoute);
app.use('/api/tasks', taskRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('back end is run');
});
