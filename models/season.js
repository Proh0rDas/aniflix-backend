const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
    sid: Number,
    sdata: {
      title: String,
      release_year: String,
      season_number: Number,
      thumbnail: String,
      banner: String,
      category: [String],
      description: String,
      episodes: [Number]
    }
  });

const Season = mongoose.model('Season', seasonSchema);

module.exports = Season;
