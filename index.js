const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./passport');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).catch(err => console.log(err));
const connection = mongoose.connection;
connection.once('open', () => { console.log('MongoDB Connected'); });

// Middleware
app.use(cors({ origin: process.env.CORS_WHITELIST, credentials: true }));
app.use(express.json());
app.use(session({
	secret: 'pinguBirthdayCard',
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: connection })
}));

app.use(passport.initialize());
app.use(passport.session());

// Routing
const notesRouter = require('./routes/notes');
const authRouter = require('./routes/auth');
app.use('/notes', notesRouter);
app.use('/auth', authRouter);

// Start Server
app.listen(port, () => {
	console.log('Server is running on port ' + port);
});
