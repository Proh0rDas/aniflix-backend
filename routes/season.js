// routes/Season.js

const express = require('express');
const router = express.Router();
const Season = require('../models/season'); // Import your Season model

// GET all Seasons or a specific Season by sid
router.get('/:sid?', async (req, res) => {
  try {
    const sid = req.params.sid; // Get the Season ID from the URL parameter

    if (sid) {
      // Query the database to find the Season with the specified sid
      const season = await Season.findOne({ sid: sid },'-_id');

      if (!season) {
        return res.status(404).json({ message: 'Season not found' });
      }

      // Return the specific Season object
      res.json(season);
    } else {
      // Retrieve all Seasons
      const allSeasons = await Season.find({},'-_id');

      // Return an array of all Season objects
      res.json(allSeasons);
    }
  } catch (error) {
    console.error('Error retrieving Season:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
