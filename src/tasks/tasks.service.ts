import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Task } from './tasks.interface';

@Injectable()
export class TasksService {
  private readonly filePath = 'tasks.json';

  constructor() {
    if (!fs.existsSync(this.filePath)) {
        fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  private readTasks(): Task[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  private writeTasks(tasks: Task[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2));
  }

  listAllTasks(status?: 'todo' | 'in-progress' | 'done'): Task[] {
    const tasks = this.readTasks();
    if (status) {
      return tasks.filter((task) => task.status === status);
    }
    return tasks;
  }

  addTask(title: string): Task {
    const tasks = this.readTasks();
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title,
      status: 'todo',
    };
    tasks.push(newTask);
    this.writeTasks(tasks);
    return newTask;
  }

  updateTask(id: string, status: 'todo' | 'in-progress' | 'done'): Task | null {
    const tasks = this.readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return null;
    
    tasks[taskIndex].status = status;
    this.writeTasks(tasks);
    return tasks[taskIndex];
  }

  deleteTask(id: string): boolean {
    const tasks = this.readTasks();
    const newTasks = tasks.filter((task) => task.id !== id);
    if (newTasks.length === tasks.length) return false;

    this.writeTasks(newTasks);
    return true;
  }
}
