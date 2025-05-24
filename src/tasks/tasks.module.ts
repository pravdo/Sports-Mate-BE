import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { EmailModule } from '../common/services/email.module';

@Module({
  imports: [ScheduleModule.forRoot(), EmailModule],
  providers: [TasksService],
})
export class TasksModule {}
