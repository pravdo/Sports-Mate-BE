import { Result } from 'src/results/entities/result.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.matchesAsPlayer1)
  player1: User;

  @ManyToOne(() => User, (user) => user.matchesAsPlayer2)
  player2: User;

  @Column()
  sport: string;

  @Column({ type: 'timestamp' })
  scheduledTime: Date;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING',
  })
  status: string;

  @OneToOne(() => Result, (result) => result.match, { lazy: true })
  result: Result;

  @CreateDateColumn()
  createdAt: Date;
}
