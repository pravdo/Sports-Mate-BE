import { City } from 'src/cities/entities/city.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
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

  @Column({ type: 'int', default: 0 })
  player1Score?: number;

  @Column({ type: 'int', default: 0 })
  player2Score?: number;

  @ManyToOne(() => User, (user) => user, { nullable: true })
  // Nullable winner in case match is not completed or has no winner
  winner: User;

  @Column()
  sport: string;

  @ManyToOne(() => City, (city) => city.matches)
  city: City;

  @Column({ type: 'timestamp' })
  scheduledTime: Date;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING',
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
