import React from 'react';
import { MdDelete } from 'react-icons/md';
const Delete = ({ todoId, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend to delete the todo
      await fetch(`http://localhost:8080/deletetodo/${todoId}`, {
        method: 'DELETE',
      });

      // Call the onDelete callback to update the UI or fetch updated todo list
      onDelete(todoId);
    } catch (error) {
      console.error(error);
      // Handle error scenarios if needed
    }
  };

  return (
    <div>
      <button onClick={handleDelete} className='relative mt-1 p-2 rounded-full bg-red-700 '><MdDelete  className="text-xl text-white"/></button>
    </div>
  );
};

export default Delete;
