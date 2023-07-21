import React, { useState } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { IoCloseCircle } from 'react-icons/io5';
import 'tailwindcss/tailwind.css'
const Update = ({ todoId }) => {
  const [toggle, setToggle] = useState(false);
  const [description, setDescription] = useState('');

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to the server to update the todo
      alert("Refresh the page to see the changes.")
      await fetch(`http://localhost:8080/updatetodo/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      // Reset the form field after successful update
      setDescription('');
    } catch (error) {
      console.error(error);
      // Handle error scenarios if needed
    }
  };

  return (
    <>
    {
      toggle ?
      (
        <div className="flex">
      <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={description}
            placeholder='Enter updated task'
            onChange={handleInputChange}
            className='border border-gray-400 rounded-lg px-4 py-2 w-7/8 mb-2'
          />
        <button type="submit" className='group relative z-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br flex items-center font-medium text-white transition-all duration-200 ease-in-out rounded-lg px-4 py-2 active:scale-95 active:shadow-inner'>Update</button>
      </form>
      <button onClick={() => setToggle(false)} className="mb-12 ml-5">
        <IoCloseCircle className="text-3xl text-red-600"/>
      </button>
    </div>
      ):(
        <button onClick={() => setToggle(true)} className="p-2 rounded-full bg-blue">
          <GrUpdate className="text-2xl text-white"/>
        </button>
      )
    }
    
    </>
  );
};

export default Update;
