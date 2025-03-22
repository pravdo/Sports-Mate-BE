import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ type: 'json', nullable: true })
  requestBody: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  response: Record<string, any>;

  @Column({ nullable: true })
  error: string;

  @Column()
  responseTime: number;

  @CreateDateColumn()
  createdAt: Date;
}
