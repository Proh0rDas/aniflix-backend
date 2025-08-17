const express = require('express');
const router = express.Router();
const Movie = require('../models/movie'); // Import your Movie model

// GET Movie data or Movie caption by mid
router.get('/', async (req, res) => {
  try {
    const allMovies = await Movie.find({}, '-_id');
    res.json(allMovies);
  } catch (error) {
    console.error('Error retrieving Movie:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
