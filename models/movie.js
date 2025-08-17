const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  mid: Number,
  mdata:{
    title: String,
    release_year: String,
    thumbnail: String,
    banner: String,
    category: [String],
    description: String,
    vdata: {
      video_type: String,
      video_url: String,
      video_caption: String,
      poster: String,
  }
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
