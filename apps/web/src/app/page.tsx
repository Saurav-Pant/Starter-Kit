'use client';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '../../../../packages/ui/src/components/ui';

interface Task {
  task_id: number;
  task_title: string;
  task_description: string;
  due_date: string;
  task_priority: 'Low' | 'Medium' | 'High';
  task_category_id: number;
  is_completed: boolean;
  created_on: string;
}

interface NewTask {
  task_title: string;
  task_description?: string;
  due_date?: string;
  task_priority?: 'Low' | 'Medium' | 'High';
  task_category_id?: number;
  is_completed?: boolean;
}

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<NewTask>({
    task_title: '',
    task_description: '',
    due_date: '',
    task_priority: 'Medium',
    task_category_id: 1,
    is_completed: false,
  });

  const fetchTasks = async () => {
    const response = await fetch('/api/hello');
    const data = await response.json();
    setTasks(data as Task[]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewTask((prevTask) => ({
        ...prevTask,
        [name]: checked,
      }));
    } else {
      setNewTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newTask,
        is_completed: newTask.is_completed ? '1' : '0',
      }),
    });
    const result = await response.json();
    console.log(result);
    fetchTasks();
    
  };

  return (
    <div className='p-4'>
      <h2 className='mb-2 text-xl font-bold'>Add New Task</h2>
      <form onSubmit={handleFormSubmit} className='mb-10 space-y-2'>
        <div>
          <label className='block text-gray-700'>Title</label>
          <input
            type='text'
            name='task_title'
            value={newTask.task_title}
            onChange={handleInputChange}
            className='w-full rounded border p-2'
            required
          />
        </div>
        <div>
          <label className='block text-gray-700'>Description</label>
          <input
            type='text'
            name='task_description'
            value={newTask.task_description}
            onChange={handleInputChange}
            className='w-full rounded border p-2'
          />
        </div>
        <div>
          <label className='block text-gray-700'>Due Date</label>
          <input
            type='date'
            name='due_date'
            value={newTask.due_date}
            onChange={handleInputChange}
            className='w-full rounded border p-2'
          />
        </div>
        <div>
          <label className='block text-gray-700'>Priority</label>
          <select
            name='task_priority'
            value={newTask.task_priority}
            onChange={handleInputChange}
            className='w-full rounded border p-2'
          >
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
        </div>
        <div>
          <label className='block text-gray-700'>
            Category ID choose 1 to 4
          </label>
          <input
            type='number'
            name='task_category_id'
            value={newTask.task_category_id}
            onChange={handleInputChange}
            className='w-full rounded border p-2'
            required
          />
        </div>
        <div>
          <label className='block text-gray-700'>Completed</label>
          <input
            type='checkbox'
            name='is_completed'
            checked={newTask.is_completed}
            onChange={handleInputChange}
            className='rounded border p-2'
          />
        </div>

        <Button type='submit'>Add Task</Button>
      </form>
      <h1 className='mb-4 text-2xl font-bold'>Task List</h1>
      <ul className='mb-4'>
        {tasks.map((task) => (
          <li
            key={task.task_id}
            className='mb-2 rounded border border-gray-300 p-2'
          >
            <h2 className='text-xl'>{task.task_title}</h2>
            <p>{task.task_description}</p>
            <p>Due Date: {task.due_date}</p>
            <p>Priority: {task.task_priority}</p>
            <p>Completed: {task.is_completed ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
