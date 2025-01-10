import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import "./todoform.css";

const TodoForm = ({ userId, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Include userId in the API payload
    axios
      .post("https://crud-todo-api-d9ar.onrender.com/todos", { title, content, userId })
      .then((response) => {
        console.log("Todo added:", response.data);
        setTitle("");
        setContent("");
        onClose(); // Close the form after successful submission
      })
      .catch((error) => {
        console.error("There was an error adding the todo:", error);
      });
  };

  return (
    <div className="todoform-overlay">
      <div className="todoform-modal">
        <FaTimes className="close-icon" onClick={onClose} />
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Add Todo</button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
