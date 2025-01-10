import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import "./editlist.css";

const EditTask = ({ task, userId, onClose, onTaskUpdated, onTaskDeleted }) => {
  const [title, setTitle] = useState(task.title);
  const [content, setContent] = useState(task.content);

  // Update task
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://crud-todo-api-d9ar.onrender.com/todos/${task._id}`, {
        title,
        content,
        userId,
      })
      .then((response) => {
        console.log("Task updated:", response.data);
        onTaskUpdated(response.data); // Notify parent of update
        onClose(); // Close the edit form
      })
      .catch((error) => {
        console.error("There was an error updating the task:", error);
      });
  };

  // Delete task
  const handleDelete = () => {
    axios
      .delete(`https://crud-todo-api-d9ar.onrender.com/todos/${task._id}`, { data: { userId: task.userId } }) // Include userId
      .then(() => {
        console.log("Task deleted");
        onTaskDeleted(task._id); // Use _id to match backend
        onClose(); // Close the edit form
      })
      .catch((error) => {
        console.error("There was an error deleting the task:", error);
      });
  };
  

  return (
    <div className="edit-task-overlay">
      <div className="edit-task-modal">
        <FaTimes className="close-icon" onClick={onClose} />
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
          />
          <button type="submit">Update Task</button>
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Delete Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
