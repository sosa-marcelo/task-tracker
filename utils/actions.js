import fs from 'fs';
import path from 'path';

const jsonPath = path.resolve('./tasks.json');
const tasks = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

export const addTask = (desc) => {
  const addedDate = new Date()

  const newTask = {
    id: tasks[tasks.length - 1].id + 1, // 'serial'
    description: desc,
    status: taskStatus.TODO,
    created_at: addedDate,
    updated_at: addedDate,
  }

  const newTasks = [...tasks, newTask]

  fs.writeFileSync(jsonPath, JSON.stringify(newTasks))
};

export const updateTask = (id, property, data) => {
  const taskToUpdate = tasks.find(t => t.id === id)

  taskToUpdate[property] = data
  taskToUpdate.updated_at = new Date()
  fs.writeFileSync(jsonPath, JSON.stringify(tasks))
};

export const deleteTask = (id) => {
  const remainingTasks = [...tasks.filter(t  => t.id !== id)]
  fs.writeFileSync(jsonPath, JSON.stringify(remainingTasks))
};

export const changeTaskStatus = (id, status) => {
  const taskToUpdate = tasks.find(t => t.id === id)

  taskToUpdate.status = status
  taskToUpdate.updated_at = new Date()
  fs.writeFileSync(jsonPath, JSON.stringify(tasks))
};

export const listTasks = (status = null) => {
  const list = [];
  status
    ? list.push(...tasks.filter(task => task.status === status))
    : list.push(...tasks)

  list.forEach(task => {
    console.log(`${task.id} -> ${task.description} (${task.status})`);
  });
};