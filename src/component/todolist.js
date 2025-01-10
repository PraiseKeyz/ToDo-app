import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTask from "./editlist";
import "./todolist.css";

const TodoList = ({ userId }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // State for filter
  const [selectedTask, setSelectedTask] = useState(null); // Task to edit

  useEffect(() => {
    axios
      .get(`https://crud-todo-api-d9ar.onrender.com/todos?userId=${userId}`)
      .then((response) => setTodos(response.data))
      .catch((error) =>
        console.error("There was an error fetching the todos:", error)
      );
  }, [userId]);

  const handleComplete = (_id, status, e) => {
    e.stopPropagation();
    axios
      .put(`https://crud-todo-api-d9ar.onrender.com/todos/${_id}`, { completed: status, userId })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === _id ? { ...todo, completed: status } : todo
          )
        );
      })
      .catch((error) => console.error("Error updating the task:", error));
  };

  const handleTaskClick = (todo) => {
    setSelectedTask(todo); // Open the edit task modal
  };

  const handleTaskUpdated = (updatedTask) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTask._id ? updatedTask : todo
      )
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== taskId));
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "all" ? !todo.completed : todo.completed
  );

  return (
    <div>
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
          <li
            key={todo._id}
            className="task-item"
            onClick={() => handleTaskClick(todo)} // Set task to edit
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => {
                handleComplete(todo._id, !todo.completed, e);
              }}
            />
            <span className={todo.completed ? "completed" : ""}>
              {todo.title} - {todo.content}
            </span>
          </li>
        ))}
      </ul>

      {/* Edit Task Modal */}
      {selectedTask && (
        <EditTask
          task={selectedTask}
          userId={userId}
          onClose={() => setSelectedTask(null)}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      )}
    </div>
  );
};

export default TodoList;
