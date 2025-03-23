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

  @ManyToOne(() => User, (user) => user)
  winner: User;

  @Column()
  sport: string;

  @ManyToOne(() => City, (city) => city.matches) // Add this relation
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
