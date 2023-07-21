import express from 'express';
import Todo from '../mongodb/models/todos.js';// Import the Todo model from the appropriate path

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Retrieve all todos from the database
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
