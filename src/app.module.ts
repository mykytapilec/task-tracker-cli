import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TasksService],
})
export class AppModule {}
