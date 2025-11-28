#!/usr/bin/env node
import { program } from 'commander';
import { taskStatus } from './utils/taskStatus.js';
import { addTask, updateTask, deleteTask, changeTaskStatus, listTasks } from './utils/actions.js';

program
  .name("task-tracker")
  .description("Un pequeño CLI de ejemplo")
  .version("1.0.0");

// Definir comandos
program
  .command('add <task>')
  .description('add a new task')
  .action((task) => {
    try {
      addTask(task);
      console.log(`Task added: ${task}`);
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  });

program
  .command('update <id> <description>')
  .description("update an existing task")
  .action((id, description) => {
    try {
      updateTask(+id, description)
      console.log(`Task ${id} updated`)
    } catch (error) {
      console.error('Error updating task:', error.message);
    }

  })

program
  .command('delete <id>')
  .description("delete a task")
  .action((id) => {
    try {
      deleteTask(+id)
      console.log(`Task ${id} deleted`)
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  })

// Cambiar el estado de una tarea
const mark = program.command('mark').description("mark a task's status")

mark
  .command(`${taskStatus.TODO} <id>`)
  .description(`change a task status to ${taskStatus.TODO}`)
  .action((id) => {
    try {
      changeTaskStatus(+id, taskStatus.TODO)
      console.log(`Task ${id} is now '${taskStatus.TODO}'`)
    } catch (error) {
      console.error('Error changing task status:', error.message);
    }
  })

mark
  .command(`${taskStatus.IN_PROGRESS} <id>`)
  .description(`change a task status to ${taskStatus.IN_PROGRESS}`)
  .action((id) => {
    try {
      changeTaskStatus(+id, taskStatus.IN_PROGRESS)
      console.log(`Task ${id} is now '${taskStatus.IN_PROGRESS}'`)
    } catch (error) {
      console.error('Error changing task status:', error.message);
    }
  })

mark
  .command(`${taskStatus.DONE} <id>`)
  .description(`change a task status to ${taskStatus.DONE}`)
  .action((id) => {
    try {
      changeTaskStatus(+id, taskStatus.DONE)
      console.log(`Task ${id} is now '${taskStatus.DONE}'`)
    } catch (error) {
      console.error('Error changing task status:', error.message);
    }
  })

// Listar tareas
const list = program
  .command('list')
  .description("list tasks")
  .action(() => listTasks())

list
  .command(taskStatus.TODO)
  .description(`list tasks with status ${taskStatus.TODO}`)
  .action(() => listTasks(taskStatus.TODO))

list
  .command(taskStatus.IN_PROGRESS)
  .description(`list tasks with status ${taskStatus.IN_PROGRESS}`)
  .action(() => listTasks(taskStatus.IN_PROGRESS))

list
  .command(taskStatus.DONE)
  .description(`list tasks with status ${taskStatus.DONE}`)
  .action(() => listTasks(taskStatus.DONE))

program.parse()

