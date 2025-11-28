# About the project
Task Tracker is a command-line tool for managing tasks. It allows users to create, list, update, and delete tasks.

## Installation

Clone the repository and then install the necessary dependencies. After that, you can use the npm link command to make the task-cli command available globally on your system.

```cli
git clone ...
cd task-tracker-cli
npm install
npm link
```

## Usage
**IMPORTANT**: You will need to create a tasks.json file in the root folder

### List all tasks
To list all tasks, you can use the following command, it will return all tasks

```
task-cli list
```
If you want to filter the tasks by status, you can use one of the following filters: done, todo, in-progress.
```bash
task-cli list todo
task-cli list in-progress
task-cli list done
```

### Create a task
To create a new task, use the add command followed by the task description in quotes.
```
task-cli add "Task description"
```

### Update a task (description)
To update the description of an existing task, use the update command followed by the task ID and the new description.

```
task-cli update <id> <description>
```
### Update task status
You can change the task's status by using one of the following commands:

```
task-cli mark todo <id>
task-cli mark in-progress <id>
task-cli mark done <id>
```

### Delete a task
To delete a task, use the following command with the task ID:

```
task-cli delete <id>
```

### Project URL: https://roadmap.sh/projects/task-tracker
