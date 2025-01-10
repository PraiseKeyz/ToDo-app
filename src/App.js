import { useState, useEffect } from "react";
import TodoForm from "./component/todoform";
import TodoList from "./component/todolist";
import Preloader from "./component/preloader";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if userId exists in local storage
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
  }, []);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="app-container">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <h1>Todo App</h1>
          <TodoList userId={userId} />
          <button className="add-icon" onClick={toggleForm}>
            <FaPlus />
          </button>
          {showForm && (
            <TodoForm userId={userId} onClose={() => setShowForm(false)} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
