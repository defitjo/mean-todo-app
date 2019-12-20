const express = require('express');

const app = express();

const cors = require('cors');

const mongoose = require('./db/mongoose');

const Title = require('./db/models/title');

const Todo = require('./db/models/todo');

app.use(cors());

app.use(express.json());

app.post('/title', (req, res) => {
  (new Title({
    description: req.body.description
  }))
  .save()
    .then(title => res.send(title))
    .catch(error => console.log(error));
});

app.get('/title', (req, res) => {
  Title.find({})
    .then(titles => res.send(titles))
    .catch(error => console.log(error));
});

app.get('/title/:titleId', (req, res) => {
  Title.find({ _id: req.params.titleId })
    .then(title => res.send(title))
    .catch(error => console.log(error));
});

app.patch('/title/:titleId', (req, res) => {
  Title.findOneAndUpdate({ _id: req.params.titleId }, { $set: req.body })
    .then(title => res.send(title))
    .catch(error => console.log(error));
});

app.delete('/title/:titleId', (req, res) => {
  const deleteTodos = (title) => {
    Todo.deleteMany({ titleId: title._id})
      .then(() => title)
      .catch(error => console.log(error))
  };
  Title.findByIdAndDelete(req.params.titleId)
    .then(title => res.send(deleteTodos(title)))
    .catch(error => console.log(error));
});

app.post('/title/:titleId/todos', (req, res) => {
  (new Todo({
    description: req.body.description,
    _titleId: req.params.titleId
  }))
  .save()
    .then(todo => res.send(todo))
    .catch(error => console.log(error));
});

app.get('/title/:titleId/todos', (req, res) => {
  Todo.find({ _titleId: req.params.titleId })
    .then(todos => res.send(todos))
    .catch(error => console.log(error));
});

app.get('/title/:titleId/todos/:todoId', (req, res) => {
  Todo.findOne({ _titleId: req.params.titleId, _id: req.params.todoId })
    .then(todo => res.send(todo))
    .catch(error => console.log(error));
});

app.patch('/title/:titleId/todos/:todoId', (req, res) => {
  Todo.findOneAndUpdate({ _titleId: req.params.titleId, _id: req.params.todoId }, { $set: req.body })
    .then(todo => res.send(todo))
    .catch(error => console.log(error));
});

app.delete('/title/:titleId/todos/:todoId', (req, res) => {
  Todo.findOneAndDelete({ _titleId: req.params.titleId, _id: req.params.todoId })
    .then(todo => res.send(todo))
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('Connected to port 3000'));
