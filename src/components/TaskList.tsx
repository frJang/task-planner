import React from 'react';
import TaskItem from './TaskItem';
import '../App.css';
import { Task } from '../types/types';

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (id: number) => void;
  onEditTask: (id: number, description: string, time: string) => void;
  onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onEditTask, onDeleteTask }) => {

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCompleteTask={() => onCompleteTask(task.id)}
          onEditTask={(description, time) => onEditTask(task.id, description, time)}
          onDeleteTask={() => onDeleteTask(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
