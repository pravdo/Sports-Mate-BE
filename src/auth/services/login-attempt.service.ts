import { Injectable } from '@nestjs/common';

interface LoginAttempt {
  timestamp: number;
  email: string;
}

@Injectable()
export class LoginAttemptService {
  private attempts: LoginAttempt[] = [];
  private readonly MAX_ATTEMPTS = 5;
  private readonly ATTEMPT_WINDOW = 5 * 60 * 1000; // 5 minutes in milliseconds

  recordFailedAttempt(email: string): void {
    const now = Date.now();
    this.attempts.push({ timestamp: now, email });
    this.cleanupOldAttempts();
  }

  isBlocked(email: string): boolean {
    const now = Date.now();
    const recentAttempts = this.attempts.filter(
      (attempt) =>
        attempt.email === email &&
        now - attempt.timestamp < this.ATTEMPT_WINDOW,
    );

    return recentAttempts.length >= this.MAX_ATTEMPTS;
  }

  getRemainingAttempts(email: string): number {
    const now = Date.now();
    const recentAttempts = this.attempts.filter(
      (attempt) =>
        attempt.email === email &&
        now - attempt.timestamp < this.ATTEMPT_WINDOW,
    );

    return Math.max(0, this.MAX_ATTEMPTS - recentAttempts.length);
  }

  private cleanupOldAttempts(): void {
    const now = Date.now();
    this.attempts = this.attempts.filter(
      (attempt) => now - attempt.timestamp < this.ATTEMPT_WINDOW,
    );
  }
}
