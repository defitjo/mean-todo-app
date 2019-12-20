const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    minlength: 3,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  _titleId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
