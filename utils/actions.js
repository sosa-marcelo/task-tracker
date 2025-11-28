import fs from 'fs';
import path from 'path';
import { taskStatus } from './taskStatus.js';

const jsonPath = path.resolve('./tasks.json');
const tasks = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

export const addTask = (desc) => {
  if (!desc || desc.trim() === '') {
    throw new Error('Task description cannot be empty');
  }

  const addedDate = new Date()

  const newTask = {
    id: tasks[tasks.length - 1].id + 1,
    description: desc,
    status: taskStatus.TODO,
    created_at: addedDate,
    updated_at: addedDate,
  }

  const newTasks = [...tasks, newTask]

  fs.writeFileSync(jsonPath, JSON.stringify(newTasks))
};

export const updateTask = (id, property, data) => {
  if (!tasks.find(t => t.id === id)) {
    throw new Error(`Task with id ${id} not found`)
  }

  if (property !== 'description') {
      throw new Error(`You can only update the description property.`)
  }

  const taskToUpdate = tasks.find(t => t.id === id)

  taskToUpdate[property] = data
  taskToUpdate.updated_at = new Date()
  fs.writeFileSync(jsonPath, JSON.stringify(tasks))
};

export const deleteTask = (id) => {
  if (!tasks.find(t => t.id === id)) {
    throw new Error(`Task with id ${id} not found`)
  }
  const remainingTasks = [...tasks.filter(t  => t.id !== id)]
  fs.writeFileSync(jsonPath, JSON.stringify(remainingTasks))
};

export const changeTaskStatus = (id, status) => {
  if (!Object.values(taskStatus).includes(status)) {
    throw new Error(`Invalid status: ${status}`)
  }

  const taskToUpdate = tasks.find(t => t.id === id)

  if (!taskToUpdate) {
    throw new Error(`Task with id ${id} not found`)
  }

  taskToUpdate.status = status
  taskToUpdate.updated_at = new Date()
  
  fs.writeFileSync(jsonPath, JSON.stringify(tasks))
};

export const listTasks = (status = null) => {
  const list = [];
  status
    ? list.push(...tasks.filter(task => task.status === status))
    : list.push(...tasks)

  if (list.length === 0) {
    console.log('No tasks found.');
    return;
  }

  list.forEach(task => {
    console.log(`${task.id} -> ${task.description} (${task.status})`);
  });
};