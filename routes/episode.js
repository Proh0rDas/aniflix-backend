const express = require('express');
const router = express.Router();
const axios = require('axios');
const Episode = require('../models/episode'); // Import your Episode model

// GET Episode data or Episode caption by eid
router.get('/:eid/:type?', async (req, res) => {
  try {
    const eid = req.params.eid; // Get the Episode ID from the URL parameter
    const type = req.params.type; // Get the optional type (either 'caption' or undefined)

    if (eid) {
      // Query the database to find the Episode with the specified eid
      const episode = await Episode.findOne({ eid: eid }, '-_id');

      if (!episode) {
        return res.status(404).json({ message: 'Episode not found' });
      }

      if (type === 'caption') {
        // Retrieve the subtitle URL from the Episode data
        const subtitleUrl = episode.vdata.video_caption;

        if (!subtitleUrl) {
          return res.status(404).json({ message: 'Episode Subtitle not found' });
        }

        // Fetch the subtitle content using Axios
        const response = await axios.get(subtitleUrl);
        res.set('Content-Type', 'text/vtt');
        res.send(response.data);
      } else {
        // Return the specific Episode object
        res.json(episode);
      }
    } else {
      res.json({ message: 'Invalid request' });
    }
  } catch (error) {
    console.error('Error retrieving Episode:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
