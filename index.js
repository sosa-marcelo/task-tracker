#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import path from 'path';

const tasks = JSON.parse(fs.readFileSync(path.resolve('./tasks.json'), 'utf-8'));


const addTask = (task) => {};
const updateTask = (id, data) => {};
const deleteTask = (id) => {};
const changeTaskStatus = (id, status) => {};
const listTasks = (status = null) => {
  status
    ? console.log(tasks.filter(task => task.status === status))
    : console.log(tasks)
};

program
  .name("task-tracker")
  .description("Un pequeño CLI de ejemplo")
  .version("1.0.0");

// Definir comandos
program
  .command('add <task>')
  .description('add a new task')
  .action((task) => {
    addTask(task);
    console.log(`Task added: ${task}`);
  });

program
  .command('update <id> <task>')
  .description("update an existing task")
  .action((id, task) => {
    updateTask(id, task)
    console.log(`Task ${id} updated`)
  })

program
  .command('delete <id>')
  .description("delete a task")
  .action((id) => {
    deleteTask(id)
    console.log(`Task ${id} deleted`)
  })

// Cambiar el estado de una tarea
const mark = program
  .command('mark')
  .description("mark a task's status")
  .action(() => {
    listTasks()
  })

mark
  .command('todo <id>')
  .description('change a task status to in-progress')
  .action((id) => {
    changeTaskStatus(id, 'todo')
    console.log(`Task ${id} is now 'todo'`)
  })

mark
  .command('in-progress <id>')
  .description('change a task status to in-progress')
  .action((id) => {
    changeTaskStatus(id, 'in-progress')
    console.log(`Task ${id} is now 'in-progress'`)
  })

mark
  .command('done <id>')
  .description('change a task status to in-progress')
  .action((id) => {
    changeTaskStatus(id, 'done')
    console.log(`Task ${id} is now 'done'`)
  })

// Listar tareas
const list = program
  .command('list')
  .description("list tasks")
  .action(() => listTasks())

list
  .command('todo')
  .description('list tasks with status todo')
  .action(() => listTasks('todo'))

list
  .command('in-progress')
  .description('list tasks with status in-progress')
  .action(() => listTasks('in-progress'))

list
  .command('done')
  .description('list tasks with status done')
  .action(() => listTasks('done'))

program.parse()

