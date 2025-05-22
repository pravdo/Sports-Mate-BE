import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Match } from '../../matches/entities/match.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  @Column({ default: 1000 }) // Starting ELO rating
  rating: number;

  @OneToMany(() => Match, (match) => match.player1)
  matchesAsPlayer1: Match[];

  @OneToMany(() => Match, (match) => match.player2)
  matchesAsPlayer2: Match[];

  @Column({ nullable: true })
  profilePicture: string;
}
