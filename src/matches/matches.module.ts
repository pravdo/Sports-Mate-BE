import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { MatchesGateway } from 'src/gateway/matches/matches.gateway';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  providers: [MatchesService, MatchesGateway],
  controllers: [MatchesController],
  exports: [MatchesService],
})
export class MatchesModule {}
