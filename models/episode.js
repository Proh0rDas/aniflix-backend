const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    eid: Number,
    title: String,
    episode_number: Number,
    vdata: {
      video_type: String,
      video_url: String,
      video_caption: String,
      poster: String
    }
  });

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
