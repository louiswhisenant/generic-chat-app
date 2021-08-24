const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
const http = require('http');
const socketio = require('socket.io');
// TODO IMPORT SOCKET FUNCTIONS

const { MONGO_URI } = config;

const app = express();

// Init middleware
app.use(express.json({ extended: false }));

// DB Config
const db = MONGO_URI;

// Connect to Mongo
const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log('MongoDB connected...');
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

connectDB();

// Define routes
// app.use('/api/EXAMPLE', require('./routes/api/EXAMPLE'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/chats', require('./routes/api/chats'));
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/users', require('./routes/api/users'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Instantiate socket.io
const server = http.createServer(app);
const io = socketio(server);

// declare PORT var
const PORT = config.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Socket logic
