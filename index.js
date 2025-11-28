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
    addTask(task);
    console.log(`Task added: ${task}`);
  });

program
  .command('update <id> <property> <data>')
  .description("update an existing task")
  .action((id, property, data) => {
    if (property !== 'description') {
      console.log(`You can only update the description property.`)
      return
    }

    updateTask(+id, property, data)
    console.log(`Task ${id} updated`)
  })

program
  .command('delete <id>')
  .description("delete a task")
  .action((id) => {
    deleteTask(+id)
    console.log(`Task ${id} deleted`)
  })

// Cambiar el estado de una tarea
const mark = program.command('mark').description("mark a task's status")

mark
  .command('todo <id>')
  .description('change a task status to in-progress')
  .action((id) => {
    changeTaskStatus(+id, 'todo')
    console.log(`Task ${id} is now 'todo'`)
  })

mark
  .command('in-progress <id>')
  .description('change a task status to in-progress')
  .action((id) => {
    changeTaskStatus(+id, 'in-progress')
    console.log(`Task ${id} is now 'in-progress'`)
  })

mark
  .command('done <id>')
  .description('change a task status to in-progress')
  .action((id) => {
    changeTaskStatus(+id, 'done')
    console.log(`Task ${id} is now 'done'`)
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

