const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => { console.log('MongoDB Connected'); });

// Routing
const notesRouter = require('./routes/notes');
const usersRouter = require('./routes/users');
app.use('/notes', notesRouter);
app.use('/users', usersRouter);

// Start Server
app.listen(port, () => {
	console.log('Server is running on port ' + port);
});