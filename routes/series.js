// routes/Series.js

const express = require('express');
const router = express.Router();
const Series = require('../models/series'); // Import your Series model

// GET all Series or a specific Series by seid
router.get('/:seid?', async (req, res) => {
  try {
    const seid = req.params.seid; // Get the Series ID from the URL parameter

    if (seid) {
      // Query the database to find the Series with the specified seid
      const series = await Series.findOne({ seid: seid },'-_id');

      if (!series) {
        return res.status(404).json({ message: 'Series not found' });
      }

      // Return the specific Series objects
      res.json(series);
    } else {
      // Retrieve all Seriess
      const allSeries = await Series.find({},'-_id');

      // Return an array of all Series objects
      res.json(allSeries);
    }
  } catch (error) {
    console.error('Error retrieving Series:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
