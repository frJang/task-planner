import React from 'react';
import '../App.css'

interface ToggleCompletedTasksButtonProps {
  showCompleted: boolean;
  onToggle: () => void;
}

const ToggleCompletedTasksButton: React.FC<ToggleCompletedTasksButtonProps> = ({ showCompleted, onToggle }) => {
  return (
    <div className="toggle-button-container">
      <button className="toggle-button" onClick={onToggle}>
       {showCompleted ? 'Скрыть завершенные задачи' : 'Показать завершенные задачи'}
      </button>
    </div>
  );
};

export default ToggleCompletedTasksButton;
