const Todo = require('../models/todo');

exports.getAll = (req, res) => {
  try {
    const todos = Todo.getAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = (req, res) => {
  try {
    const todo = Todo.getById(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const todo = Todo.create({ title, description, status, priority });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = (req, res) => {
  try {
    const existing = Todo.getById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    const todo = Todo.update(req.params.id, req.body);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = (req, res) => {
  try {
    const existing = Todo.getById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    Todo.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByStatus = (req, res) => {
  try {
    const todos = Todo.getByStatus(req.params.status);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
