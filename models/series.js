const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    seid: Number,
    sedata: {
      title: String,
      release_year: String,
      thumbnail: String,
      banner: String,
      category: [String],
      description: String,
      seasons: [Number]
    },
});

const Series = mongoose.model('Series', seriesSchema);

module.exports = Series;
