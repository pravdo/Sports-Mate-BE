import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly emailService: EmailService) {}

  // Adjust the time to run the job as per need
  @Cron(CronExpression.EVERY_YEAR)
  async handleScheduledEmails() {
    this.logger.debug('Running scheduled email task...');
    try {
      const emailContent = `
        <h1>Daily Sports Update</h1>
        <p>Here's your daily sports update:</p>
        <ul>
          <li>Upcoming matches</li>
          <li>Recent results</li>
          <li>Team updates</li>
        </ul>
      `;

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
