import React, { useState, useEffect } from 'react';
import '../App.css';
import { Task } from '../types/types';

interface TaskItemProps {
  task: Task;
  onCompleteTask: () => void;
  onEditTask: (description: string, time: string) => void;
  onDeleteTask: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onCompleteTask, onEditTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedTime, setEditedTime] = useState(task.time);
  const [isTaskUrgent, setIsTaskUrgent] = useState(false);
  const [isTaskOverdue, setIsTaskOverdue] = useState(false);

  useEffect(() => {
    setIsTaskUrgent(false);
    setIsTaskOverdue(false);
  }, [task]);

  useEffect(() => {
    const checkTaskStatus = () => {
      const now = new Date();
      const taskTime = new Date(`${now.toDateString()} ${task.time}`);
      const timeDiff = taskTime.getTime() - now.getTime();
  
      setIsTaskUrgent((prev) => timeDiff <= 10 * 60 * 1000);
      setIsTaskOverdue((prev) => timeDiff < 0);
  
      const timeUntilNextMinute = 60 * 1000 - (now.getSeconds() * 1000 + now.getMilliseconds());
  
      setTimeout(checkTaskStatus, timeUntilNextMinute);
    };
  
    checkTaskStatus();
  }, [task.time]);

  const handleSaveEdit = () => {
    onEditTask(editedDescription, editedTime);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${isTaskOverdue ? 'overdue' : isTaskUrgent ? 'urgent' : ''}`}>
      {!isEditing ? (
       <>
       <div className="task-details">
         <span className="task-description">{task.description}</span>
         <span className="task-time">{task.time}</span>
       </div>
       <div className="task-buttons">
         <button className="complete-button" onClick={onCompleteTask}>
           Завершить
         </button>
         <button className="edit-button" onClick={() => setIsEditing(true)}>
           Редактировать
         </button>
         <button className="delete-button" onClick={onDeleteTask}>
           Удалить
         </button>
       </div>
     </>
      ) : (
        <>
          <div className="edit-inputs">
            <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="edit-description-input"
            />
            <input
            type="time"
            value={editedTime}
            onChange={(e) => setEditedTime(e.target.value)}
            className="edit-time-input"
           />
        </div>
        <button className="save-button" onClick={handleSaveEdit}>
          Сохранить
        </button>
      </>
      )}
    </div>
  );
};

export default TaskItem;
