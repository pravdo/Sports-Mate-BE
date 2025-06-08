import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Match } from './matches/entities/match.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ActivityLogModule } from './interceptors/activity-log/activity-log.module';
import { ActivityLog } from './interceptors/activity-log/entities/activity-log.entity';
import { City } from './cities/entities/city.entity';
import { CitiesModule } from './cities/cities.module';
import { SeedModule } from './seed/seed.module';
import { TasksModule } from './tasks/tasks.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    CacheModule.register(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Match, City, ActivityLog],
        synchronize: true, // set to false for production
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CitiesModule,
    SeedModule,
    ActivityLogModule,
    TasksModule,
  ],
  controllers: [],
  providers: [{ provide: 'APP_INTERCEPTOR', useClass: CacheInterceptor }],
})
export class AppModule {}
