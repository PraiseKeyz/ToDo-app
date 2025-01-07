import React, { useState} from "react";
import axios from "axios";
import './todoform.css'


const TodoForm = () => {


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post("http://localhost:5000/todos", { title, content })
        .then(response => {
          console.log("Todo added:", response.data);
        })
        .catch(error => {
          console.error("There was an error adding the todo:", error);
        });
    };
  
    return (
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
    );
  };
  
  export default TodoForm;
  

