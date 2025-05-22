import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginAttemptService } from './services/login-attempt.service';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private loginAttemptService: LoginAttemptService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    if (this.loginAttemptService.isBlocked(email)) {
      throw new HttpException(
        'Too many login attempts. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    const user = await this.validateUser(email, password);
    if (!user) {
      this.loginAttemptService.recordFailedAttempt(email);
      const remainingAttempts =
        this.loginAttemptService.getRemainingAttempts(email);
      throw new UnauthorizedException(
        `Invalid credentials. ${remainingAttempts} attempts remaining`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  logout() {
    return { message: 'Successfully logged out' };
  }
}
