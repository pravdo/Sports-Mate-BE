import { PartialType } from '@nestjs/mapped-types';
import { IsUUID, IsOptional, IsInt, Min } from 'class-validator';
import { CreateMatchDto, MatchStatus } from './create-match.dto';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  @IsUUID()
  @IsOptional()
  winnerId?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  player1Score?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  player2Score?: number;

  status?: MatchStatus;
}
