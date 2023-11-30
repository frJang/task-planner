import React, { useState } from 'react';
import '../App.css';

interface TaskFormProps {
  onAddTask: (description: string, time: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const handleAddTask = () => {
    if (newTaskDescription && newTaskTime) {
      onAddTask(newTaskDescription, newTaskTime);

      setNewTaskDescription('');
      setNewTaskTime('');
    }
  };

  return (
    <div className="form-container">
      <h2>Добавить новую задачу</h2>
      <label>
        <span>Описание:</span>
       <input
      type="text"
      value={newTaskDescription}
      onChange={(e) => setNewTaskDescription(e.target.value)}
      />
     </label>
  <label>
    <span>Время:</span>
    <input
      type="time"
      value={newTaskTime}
      onChange={(e) => setNewTaskTime(e.target.value)}
    />
  </label>
  <button onClick={handleAddTask}>Добавить задачу</button>
    </div>
  );
};

export default TaskForm;
