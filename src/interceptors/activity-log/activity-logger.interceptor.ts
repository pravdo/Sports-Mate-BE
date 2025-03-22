/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  RequestWithUser,
  ActivityLogData,
} from 'src/common/interfaces/activity-log.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-log.entity';

@Injectable()
export class ActivityLoggerInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(ActivityLog)
    private activityLogRepository: Repository<ActivityLog>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const { method, url, body, user } = request;
    const now = Date.now();

    const createLogData = (response?: any, error?: any): ActivityLogData => ({
      method,
      url,
      userId: user?.id,
      userEmail: user?.email,
      requestBody: body,
      response,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error: error?.message,
      responseTime: Date.now() - now,
    });

    return next.handle().pipe(
      tap({
        next: (response: any) => {
          const logData = createLogData(response);
          void this.activityLogRepository.save(logData);
        },
        error: (error: Error) => {
          const logData = createLogData(undefined, error);
          void this.activityLogRepository.save(logData);
        },
      }),
    );
  }
}
