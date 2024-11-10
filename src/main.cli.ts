import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TasksService } from './tasks/tasks.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tasksService = app.get(TasksService);

  const args = process.argv.slice(2);
  const command = args[0];
  const commandArgs = args.slice(1);

  switch (command) {
    case 'add':
      if (commandArgs.length === 0) {
        console.error('Please provide a title for the task.');
        break;
      }
      const task = tasksService.addTask(commandArgs.join(' '));
      console.log(`Added task: ${task.id} - ${task.title}`);
      break;

    case 'list':
      const filter = commandArgs[0] as 'todo' | 'in-progress' | 'done' | undefined;
      const tasks = tasksService.listAllTasks(filter);
      if (tasks.length === 0) {
        console.log(`No tasks found${filter ? ` with status "${filter}"` : ''}.`);
      } else {
        tasks.forEach((task) =>
          console.log(`[${task.status}] ${task.id}: ${task.title}`),
        );
      }
      break;

    case 'update':
      if (commandArgs.length < 2) {
        console.error('Please provide task ID and new status (todo, in-progress, done).');
        break;
      }
      const [id, status] = commandArgs;
      if (!['todo', 'in-progress', 'done'].includes(status)) {
        console.error('Invalid status. Use "todo", "in-progress", or "done".');
        break;
      }
      const updatedTask = tasksService.updateTask(id, status as 'todo' | 'in-progress' | 'done');
      if (updatedTask) {
        console.log(`Updated task ${updatedTask.id} to status ${updatedTask.status}.`);
      } else {
        console.error(`Task with ID ${id} not found.`);
      }
      break;

    case 'delete':
      if (commandArgs.length === 0) {
        console.error('Please provide the task ID to delete.');
        break;
      }
      const deleted = tasksService.deleteTask(commandArgs[0]);
      if (deleted) {
        console.log(`Deleted task with ID ${commandArgs[0]}.`);
      } else {
        console.error(`Task with ID ${commandArgs[0]} not found.`);
      }
      break;

    default:
      console.log(`Invalid command. Use one of the following:
      - add <title>: Adds a new task
      - list [status]: Lists tasks (all, todo, in-progress, done)
      - update <id> <status>: Updates a task's status
      - delete <id>: Deletes a task`);
  }

  await app.close();
}

bootstrap();
