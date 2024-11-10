Task Tracker CLI
Task Tracker is a command-line application built with Nest.js for managing a to-do list. This app allows you to add, update, delete, and list tasks with various statuses (todo, in-progress, done). Tasks are stored in a JSON file, which is automatically created in the project root if it does not already exist.

Project URL
https://roadmap.sh/projects/task-tracker

Features
Add new tasks
Update task status (todo, in-progress, done)
Delete tasks
List tasks by status or all tasks
Requirements
Node.js (v12 or higher)
Nest.js (included as part of the project dependencies)

Getting Started
1. Clone the repository

  git clone https://github.com/mykytapilec/task-tracker-cli.git
  cd task-tracker-cli

2. Install dependencies

  npm install

3. Build the application

  Compile TypeScript files into JavaScript:
  npm run build

4. Run Commands
You can now use the CLI to manage your tasks. See usage examples in the Usage section.

Usage
The CLI uses the following command syntax:

node dist/main.cli.js <command> [arguments]

Replace <command> with one of the available commands (add, list, update, delete), and add the appropriate arguments as needed.

Available Commands
Command	Description
add <title>	Adds a new task with the given title
list	Lists all tasks
list <status>	Lists tasks filtered by status (todo, in-progress, done)
update <id> <status>	Updates a task's status (todo, in-progress, done)
delete <id>	Deletes a task by its ID

Examples:

Add a Task
To add a task, provide a title:
node dist/main.cli.js add "Write project documentation"
Output:
Added task: 1 - Write project documentation

List All Tasks
To list all tasks:
node dist/main.cli.js list
Output:
[todo] 1: Write project documentation

List Tasks by Status
To list tasks filtered by a specific status (todo, in-progress, done):
node dist/main.cli.js list todo
Output:
[todo] 1: Write project documentation

Update a Task's Status
To update the status of a task by providing its ID and new status:
node dist/main.cli.js update 1 in-progress
Output:
Updated task 1 to status in-progress.

Delete a Task
To delete a task by its ID:
node dist/main.cli.js delete 1
Output:
Deleted task with ID 1.

Task Storage
All tasks are stored in a JSON file named tasks.json, located in the project root. This file is automatically created the first time you run a command if it doesn’t already exist.

Error Handling
The application handles the following errors gracefully:

Invalid commands or arguments
Missing or invalid task IDs
Invalid status updates
If an error occurs, you will see an appropriate error message in the terminal.

Development
During development, you can use ts-node to avoid rebuilding each time:
npx ts-node src/main.cli.ts <command> [arguments]

For example:
npx ts-node src/main.cli.ts add "Test task with ts-node"

License
This project is licensed under the MIT License.



