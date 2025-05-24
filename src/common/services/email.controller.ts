/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('test')
  async testEmail(@Body() body: { to: string }) {
    try {
      const result = await this.emailService.sendEmail(
        body.to,
        'Test Email from Sports Mate',
        `
          <h1>Test Email</h1>
          <p>This is a test email from Sports Mate application.</p>
          <p>If you're receiving this, your email configuration is working correctly!</p>
        `,
      );
      return { success: true, messageId: result.messageId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
