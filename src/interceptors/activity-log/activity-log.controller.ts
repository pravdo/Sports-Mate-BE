import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { JwtAuthGuard } from '../../auth/jwt.guard';

@Controller('activity-logs')
@UseGuards(JwtAuthGuard)
export class ActivityLogController {
  constructor(
    @InjectRepository(ActivityLog)
    private activityLogRepository: Repository<ActivityLog>,
  ) {}

  @Get()
  async findAll() {
    return this.activityLogRepository.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }
}
