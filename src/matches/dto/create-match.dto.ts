import { IsString, IsUUID, IsDateString, IsEnum } from 'class-validator';

export enum MatchStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class CreateMatchDto {
  @IsUUID()
  player1Id: string;

  @IsUUID()
  player2Id: string;

  @IsString()
  sport: string;

  @IsDateString()
  scheduledTime: Date;

  @IsEnum(MatchStatus)
  status: MatchStatus = MatchStatus.PENDING;
}
