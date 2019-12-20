const mongoose = require('mongoose');

const TitleSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    minlength: 3
  },
});

const Title = mongoose.model('Title', TitleSchema);

module.exports = Title;
