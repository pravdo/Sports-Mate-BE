import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ForgotPasswordEvent } from 'src/events/forgot-password.event';
import { EmailService } from '../services/email.service';

@Injectable()
export class EmailListener {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent('forgot-password')
  async handleForgotPassword(event: ForgotPasswordEvent) {
    const resetLink = `http://localhost:3000/reset-password?token=${event.resetToken}`;
    await this.emailService.sendEmail(
      event.email,
      'Reset your password',
      `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
    );
  }
}
