const express = require('express');
const router = express.Router();
const axios = require('axios');
const Movie = require('../models/movie'); // Import your Movie model

// GET Movie data or Movie caption by mid
router.get('/:mid/:type?', async (req, res) => {
  try {
    const mid = req.params.mid; // Get the Movie ID from the URL parameter
    const type = req.params.type; // Get the optional type (either 'caption' or undefined)

    if (mid) {
      // Query the database to find the Movie with the specified mid
      const movie = await Movie.findOne({ mid: mid }, '-_id');

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      if (type === 'caption') {
        // Retrieve the subtitle URL from the Movie data
        const subtitleUrl = movie.mdata.vdata.video_caption;

        if (!subtitleUrl) {
          return res.status(404).json({ message: 'Movie Subtitle not found' });
        }

        // Fetch the subtitle content using Axios
        const response = await axios.get(subtitleUrl);
        res.set('Content-Type', 'text/vtt');
        res.send(response.data);
      } else {
        // Return the specific Movie object
        res.json(movie);
      }
    } else {
      res.json({ message: 'Invalid request' });
    }
  } catch (error) {
    console.error('Error retrieving Movie:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
