import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import Todo from '../mongodb/models/todos.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Delete Route");
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Delete the Todo document from the database
    await Todo.findByIdAndDelete(id);

    res.status(201).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
})

export default router;