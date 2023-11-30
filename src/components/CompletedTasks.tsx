import React from 'react';
import '../App.css'
import { Task } from '../types/types';

interface CompletedTasksProps {
  completedTasks: Task[];
  onClearCompleted: () => void;
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ completedTasks, onClearCompleted }) => {
  return (
    <div className="completed-tasks">
      <h2>Завершенные задачи</h2>
      {completedTasks.map((task) => (
        <div key={task.id} className="completed-task">
          <span>{task.description}</span>
        </div>
      ))}
      <button className='completed-task-button' onClick={onClearCompleted}>Очистить завершенные задачи</button>
    </div>
  );
};

export default CompletedTasks;
