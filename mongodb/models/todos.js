import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  description:{ type: String, required: true },
  // adding the time and date at whcih the todo was created
  createdAt: { type: Date, default: Date.now },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;