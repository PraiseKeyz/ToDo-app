// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './todolist.css';
// const TodoList = () => {
//   const [todos, setTodos] = useState([]);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     axios.get("http://localhost:5000/todos")
//       .then(response => setTodos(response.data))
//       .catch(error => console.error("There was an error fetching the todos:", error));
//   }, []);

//   // const handleComplete = (id, status) => {
//   //   axios.put(`http://localhost:5000/todos/${id}`, { completed: status })
//   //     .then(response => {
//   //       // Update the local state
//   //       setTodos(prevTodos =>
//   //         prevTodos.map(todo =>
//   //           todo.id === id ? { ...todo, completed: status } : todo
//   //         )
//   //       );
//   //     })
//   //     .catch(error => console.error("Error updating the task:", error));
//   // };
  
//   const filteredTodos = todos.filter((todo) =>
//     filter === "all" ? !todo.completed : todo.completed
//   );

//   return (
//     <div>
           
//         <button
//           className={filter === "all" ? "active" : ""}
//           onClick={() => setFilter("all")}
//         >
//           All Tasks
//         </button>
//         <button
//           className={filter === "completed" ? "active" : ""}
//           onClick={() => setFilter("completed")}
//         >
//           Completed Tasks
//         </button>
//       <ul>
//         {filteredTodos.map(todo => (
//           <li key={todo.id}>
//           <input
//           type="checkbox"
//           checked={todo.completed}
//           onChange={() => handleComplete(todo.id, !todo.completed)}
//         />
//             {todo.title} <br/> {todo.content} {todo.completed ? "Completed" : "Pending"}
//           </li>

//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./todolist.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // State for filter

  useEffect(() => {
    axios
      .get("https://crud-todo-api-blue.vercel.app/todos")
      .then((response) => setTodos(response.data))
      .catch((error) =>
        console.error("There was an error fetching the todos:", error)
      );
  }, []);

  const handleComplete = (id, status) => {
    axios
      .put(`https://crud-todo-api-blue.vercel.app/todos/${id}`, { completed: status })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: status } : todo
          )
        );
      })
      .catch((error) => console.error("Error updating the task:", error));
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "all" ? !todo.completed : todo.completed
  );

  return (
    <div>
      <h2>Todo List</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All Tasks
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed Tasks
        </button>
      </div>

      {/* Tasks List */}
      <ul className="task-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="task-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleComplete(todo.id, !todo.completed)}
            />
            <span className={todo.completed ? "completed" : ""}>
              {todo.title} - {todo.content}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
