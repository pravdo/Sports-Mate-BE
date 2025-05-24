import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly emailService: EmailService) {}

  // This cron job runs every day at midnight
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleScheduledEmails() {
    this.logger.debug('Running scheduled email task...');
    try {
      // Example: Send a daily digest email
      const emailContent = `
        <h1>Daily Sports Update</h1>
        <p>Here's your daily sports update:</p>
        <ul>
          <li>Upcoming matches</li>
          <li>Recent results</li>
          <li>Team updates</li>
        </ul>
      `;

      // TODO: Replace with actual recipient email
      await this.emailService.sendEmail(
        'pravdo00@gmail.com',
        'Daily Sports Update',
        emailContent,
      );

      this.logger.debug('Scheduled email task completed successfully');
    } catch (error) {
      this.logger.error('Error in scheduled email task:', error);
    }
  }
}
