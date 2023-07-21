import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import Todo from '../mongodb/models/todos.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Update Route");
})

router.put('/:id', async (req, res) => {
  const todoId = req.params.id;
    const { description } = req.body;

  try {
    
    // Find the todo by its ID
    const todoToUpdate = await Todo.findById(todoId);

    if (!todoToUpdate) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Update the todo's description
    todoToUpdate.description = description;
    
    // Save the updated todo to the database
    const updatedTodo = await todoToUpdate.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;