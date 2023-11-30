import React, { useState, useEffect } from 'react';
import './App.css';

import { Task } from './types/types';

import TaskForm from './components/TaskForm';
import ToggleCompletedTasksButton from './components/ToggleCompletedTasksButton';
import TaskList from './components/TaskList';
import CompletedTasks from './components/CompletedTasks';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage('tasks');
    const storedCompletedTasks = getTasksFromLocalStorage('completedTasks');

    if (storedTasks) {
      setTasks(storedTasks);
    }

    if (storedCompletedTasks) {
      setCompletedTasks(storedCompletedTasks);
    }
  }, []);

  useEffect(() => {
    saveTasksToLocalStorage('tasks', tasks);
    saveTasksToLocalStorage('completedTasks', completedTasks);
  }, [tasks, completedTasks]);

  const getTasksFromLocalStorage = (key: string): Task[] | null => {
    const storedTasks = localStorage.getItem(key);
    return storedTasks ? JSON.parse(storedTasks) : null;
  };

  const saveTasksToLocalStorage = (key: string, value: Task[]) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleCompleteTask = (id: number) => {
    const completedTask = tasks.find((task) => task.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleClearCompleted = () => {
    setCompletedTasks([]);
  };

  const handleEditTask = (id: number, description: string, time: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, description, time } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddTask = (description: string, time: string) => {
    const newTask: Task = {
      id: new Date().getTime(),
      description,
      time,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      <ToggleCompletedTasksButton showCompleted={showCompleted} onToggle={() => setShowCompleted(!showCompleted)} />
      {showCompleted ? (
        <CompletedTasks completedTasks={completedTasks} onClearCompleted={handleClearCompleted} />
      ) : (
        <TaskList
          tasks={tasks}
          onCompleteTask={handleCompleteTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default App;
