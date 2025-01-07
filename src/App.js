import { useState, useEffect } from 'react';
import TodoForm from './component/todoform';
import TodoList from './component/todolist';
import Preloader from './component/preloader';
import { FaPlus } from 'react-icons/fa';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm); // Toggles the visibility of the form
  };

  return (
    <div className="app-container">
{loading ? (
        <Preloader /> // Show preloader while loading
      ) : (
        <>
      <h1>Todo App</h1>
      {showForm && (
        <div className="form-container">
          <TodoForm />
        </div>
      )}
      <div className="todo-list-wrapper">
        <TodoList />
      </div>
      <button className="add-icon" onClick={toggleForm}>
          <FaPlus />
        </button>
        </>
      )}
    </div>
  );
}

export default App;

