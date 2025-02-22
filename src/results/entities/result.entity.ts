import { Match } from '../../matches/entities/match.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Match, (match) => match.result, { lazy: true })
  @JoinColumn()
  match: Match;

  @Column()
  winnerId: string;

  @Column()
  loserId: string;

  @CreateDateColumn()
  createdAt: Date;
}
