const express = require('express');
const router = express.Router();
const Movie = require('../models/movie'); // Import your Movie model
const Series = require('../models/series'); // Import your Series model

// GET Movie data or Movie caption by mid
router.get('/', async (req, res) => {
  try {
    const allMovies = await Movie.find({}, '-_id').select('-mdata');
    const allSeries = await Series.find({},'-_id').select('-sedata');
    const ids = [...allMovies.slice(1), ...allSeries];
    res.json(ids.sort(() => Math.random() - 0.5).slice(0, 12));
  } catch (error) {
    console.error('Error retrieving ids:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;