const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const movieRoute = require('./api/movies/movie.route');
const settingRoute = require('./api/settings/setting.route');

const app = express();

const PORT = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/movie-shop';

app.use(cors({ origin: '*' }));

// body-parser update request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/movies', movieRoute);
app.use('/api/settings', settingRoute);

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});

// Database setup
mongoose.connect(DB_URI);

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => console.log('DB connected'));