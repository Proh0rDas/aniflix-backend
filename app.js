require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoute = require('./routes/movie'); // Import your movies route
const moviesRoute = require('./routes/movies');
const seriesRoute = require('./routes/series'); 
const seasonRoute = require('./routes/season'); 
const episodeRoute = require('./routes/episode');
const idsRoute = require('./routes/ids');
const app = express();

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options('*', cors());

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Use the /api prefix for all routes
app.use('/api/movie', movieRoute); // Example: http://localhost:3000/api/movie
app.use('/api/movies', moviesRoute);
app.use('/api/series', seriesRoute);
app.use('/api/season', seasonRoute);
app.use('/api/episode', episodeRoute);
app.use('/api/ids', idsRoute);

// Other app configurations and routes go here

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});