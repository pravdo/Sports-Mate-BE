import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import googleOauthConfig from './config/google-oauth.config';
import { GoogleStrategy } from './strategy/google.stategy';
import { LoginAttemptService } from './services/login-attempt.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forFeature(googleOauthConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, GoogleStrategy, LoginAttemptService],
  exports: [AuthService],
})
export class AuthModule {}
