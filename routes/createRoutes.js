import express from 'express';
import cors from 'cors';

import Todo from '../mongodb/models/todos.js';

const router = express.Router();

// Enable CORS middleware
router.use(cors());

router.get('/', (req, res) => {
  res.send("Create Route");
});

router.post('/', async (req, res) => {
  try {
    const { description } = req.body;

    // Create a new Todo document with the description and the current date and time
    const newTodo = new Todo({ description });

    // Save the new Todo document to the database
    await newTodo.save();

    // Format the createdAt field to 'YYYY-MM-DD HH:mm:ss'
    const formattedCreatedAt = newTodo.createdAt.toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Return the newly created Todo document in the response with the formatted createdAt field
    res.status(201).json({ ...newTodo._doc, createdAt: formattedCreatedAt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
