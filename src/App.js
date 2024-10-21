import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [listTodo, setListTodo] = useState([]);

  // Load saved todos from localStorage when component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setListTodo(savedTodos);
    }
  }, []);

  // Save todos to localStorage whenever listTodo changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(listTodo));
  }, [listTodo]);

  let addList = (inputText) => {
    if (inputText !== '') setListTodo([...listTodo, inputText]);
  };

  const deleteListItem = (key) => {
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList} />
        <h1 className="app-heading">TODO</h1>
        <hr/>
        {listTodo.map((listItem, i) => (
          <TodoList key={i} index={i} item={listItem} deleteItem={deleteListItem} />
        ))}
      </div>
    </div>
  );
}

export default App;
