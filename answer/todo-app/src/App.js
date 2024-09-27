import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskDetails, setTaskDetails] = useState({
    assignedTo: '',
    dueDate: '',
    comments: '',
    priority: 'Low',
    status: 'Not Started',
  });
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // 'create', 'edit', 'delete'

  // Open modal for creating new task
  const openNewTaskModal = () => {
    resetForm();
    setActionType('create');
    setIsTaskModalOpen(true);
  };

  // Open modal for editing a task
  const openEditTaskModal = (task) => {
    setTaskDetails(task);
    setCurrentTask(task);
    setActionType('edit');
    setIsTaskModalOpen(true);
  };

  // Open modal for confirming task deletion
  const openDeleteTaskModal = (task) => {
    setCurrentTask(task);
    setActionType('delete');
    setIsTaskModalOpen(true);
  };

  // Add or edit task
  const handleSaveTask = (e) => {
    e.preventDefault();
    if (actionType === 'create') {
      addTask(taskDetails);
    } else if (actionType === 'edit') {
      updateTask(taskDetails);
    }
    setIsTaskModalOpen(false);
  };

  // Add new task
  const addTask = (details) => {
    if (details.assignedTo.trim() === '') return;
    setTasks([...tasks, { ...details, id: tasks.length + 1 }]);
    resetForm();
  };

  // Update an existing task
  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    resetForm();
  };

  // Remove a task
  const removeTask = () => {
    setTasks(tasks.filter((task) => task.id !== currentTask.id));
    setIsTaskModalOpen(false);
  };

  // Reset form fields
  const resetForm = () => {
    setTaskDetails({
      assignedTo: '',
      dueDate: '',
      comments: '',
      priority: 'Low',
      status: 'Not Started',
    });
    setCurrentTask(null);
    setActionType(null);
  };

  // Render task form for Add/Edit
  const renderTaskForm = () => (
    <form onSubmit={handleSaveTask}>
      <label>
        Assigned To:
        <input
          type="text"
          value={taskDetails.assignedTo}
          onChange={(e) => setTaskDetails({ ...taskDetails, assignedTo: e.target.value })}
          required
        />
      </label>
      <label>
        Due Date:
        <input
          type="date"
          value={taskDetails.dueDate}
          onChange={(e) => setTaskDetails({ ...taskDetails, dueDate: e.target.value })}
          required
        />
      </label>
      <label>
        Comments:
        <textarea
          value={taskDetails.comments}
          onChange={(e) => setTaskDetails({ ...taskDetails, comments: e.target.value })}
        />
      </label>
      <label>
        Priority:
        <select
          value={taskDetails.priority}
          onChange={(e) => setTaskDetails({ ...taskDetails, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </label>
      <label>
        Status:
        <select
          value={taskDetails.status}
          onChange={(e) => setTaskDetails({ ...taskDetails, status: e.target.value })}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <div className="form-buttons">
        <button type="button" onClick={() => setIsTaskModalOpen(false)}>
          Cancel
        </button>
        <button type="submit">{actionType === 'create' ? 'Add Task' : 'Update Task'}</button>
      </div>
    </form>
  );

  // Render delete confirmation modal
  const renderDeleteConfirmation = () => (
    <div>
      <h3>Are you sure you want to delete this task?</h3>
      <div className="delete-popup-buttons">
        <button onClick={() => setIsTaskModalOpen(false)}>Cancel</button>
        <button onClick={removeTask}>Delete</button>
      </div>
    </div>
  );

  // Render task modal (for Add/Edit/Delete)
  const renderTaskModal = () => (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setIsTaskModalOpen(false)}>&times;</span>
        {actionType === 'delete' ? renderDeleteConfirmation() : renderTaskForm()}
      </div>
    </div>
  );

  // Render the task table
  const renderTable = () => (
    <table className="task-table">
      <thead>
        <tr>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.assignedTo}</td>
            <td>
              <span className={`badge ${task.status.replace(/\s+/g, '-').toLowerCase()}`}>
                {task.status}
              </span>
            </td>
            <td>{task.dueDate}</td>
            <td>
              <span className={`priority-${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
            </td>
            <td>{task.comments}</td>
            <td>
              <button onClick={() => openEditTaskModal(task)}>Edit</button>
              <button onClick={() => openDeleteTaskModal(task)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Task Dashboard</h1>
        <button onClick={openNewTaskModal}>New Task</button>
      </div>
      {renderTable()}
      {isTaskModalOpen && renderTaskModal()}
    </div>
  );
};

export default App;
