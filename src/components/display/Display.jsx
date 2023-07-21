import React, { useState, useEffect } from 'react';
import Delete from '../Delete';
import Update from '../Update';

const Display = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      // Fetch the todos from the server
      const response = await fetch("http://localhost:8080/showtodo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTodos(data); // Update the todos state with the received data
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      // Send a DELETE request to the server to delete the todo
      await fetch(`http://localhost:8080/deletetodo/${todoId}`, {
        method: 'DELETE',
      });

      // Update the UI by removing the deleted todo from the state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error(error);
      // Handle error scenarios if needed
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === '') {
      alert("Fill the input field");
      return;
    }

    try {
      // Send the POST request to create a new todo
      const response = await fetch("http://localhost:8080/createtodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: input,
        }),
      });

      // Handle the response as needed
      if (response.ok) {
        // If the response is successful, fetch the updated todos and update the state
        fetchTodos();
        setInput(''); // Reset the input field after successful submission
      } else {
        // Handle error scenarios if needed
        console.error('Failed to create todo.');
      }
    } catch (error) {
      console.error(error);
      // Handle error scenarios if needed
    }
  };

  return (
    <div className='w-full bg-slate-300'>
      <h2 className="ml-5 mb-5 mt-5 text-5xl font-abeezee">Todo List App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter a task'
          value={input}
          onChange={handleInput}
          className='rounded-lg border-2 border-solid border-gray-400 w-4/5 px-4 py-3 ml-5 mb-3'
        />
        <button 
        type="submit"
        className="group relative z-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br flex items-center font-medium text-white transition-all duration-200 ease-in-out rounded-lg px-4 py-2 active:scale-95 active:shadow-inner ml-5">
  <div class="absolute -z-10 -inset-0.5 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-xl group-hover:opacity-100 animate-pulse group-hover:inset-10"></div>
  <div class="svg-wrapper transform group-hover:translate-x-5 group-hover:rotate-45 transition-all duration-400">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path fill="#fff" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
    </svg>
  </div>
  <span class="ml-1 text-white transition-all duration-300 group-hover:text-transparent">Submit</span>
</button>





      </form>
      <ul className='ml-5 mr-5'>
        {todos.map((todo) => (
          <li key={todo._id} className='flex justify-between w-full border border-gray-200 py-3 px-2 mb-5'>
            <div className="flex flex-col w-5/6">
           <span>{todo.description}</span>
             <span className='text-gray-500 text-sm'>
              Created at: {new Date(todo.createdAt).toLocaleString()} {/* Display the current date and time */}
            </span>
            </div>
            <div className="flex gap-5">
              <Delete todoId={todo._id} onDelete={handleDeleteTodo} />
              <Update todoId={todo._id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
