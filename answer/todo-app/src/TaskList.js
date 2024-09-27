// src/TaskList.js
import React from 'react';

const TaskList = ({ tasks, toggleTaskCompletion, removeTask }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index} style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
          <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
          <button onClick={() => removeTask(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
