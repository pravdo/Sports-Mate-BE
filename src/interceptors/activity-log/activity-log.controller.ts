import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt.guard';

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

  @Get('user/:id')
  async findByUser(@Param('id') id: string) {
    return this.activityLogRepository.find({
      where: { userId: id },
      order: { createdAt: 'DESC' },
    });
  }
}
