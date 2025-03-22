import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ActivityLoggerInterceptor } from './activity-logger.interceptor';
import { ActivityLog } from './entities/activity-log.entity';
import { ActivityLogController } from './activity-log.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLog])],
  controllers: [ActivityLogController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ActivityLoggerInterceptor,
    },
  ],
})
export class ActivityLogModule {}
