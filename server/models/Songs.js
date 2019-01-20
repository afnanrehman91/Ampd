const mongoose = require('mongoose');

const SongsSchema = new mongoose.Schema({
  url: {
    type: String,
    default: ''
  },
  cover: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  artist: {
    type: String,
    default: ''
  }

});

module.exports = mongoose.model('Songs', SongsSchema);
