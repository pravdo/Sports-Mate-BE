import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchesGateway } from 'src/gateway/matches/matches.gateway';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match) private matchRepo: Repository<Match>,
    private readonly matchesGateway: MatchesGateway,
  ) {}

  async findAll(): Promise<Match[]> {
    return this.matchRepo.find({
      relations: ['player1', 'player2', 'winner', 'city'],
    });
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.matchRepo.findOne({
      where: { id },
      relations: ['player1', 'player2', 'winner', 'city'],
    });
    if (!match) throw new NotFoundException(`Match with ID ${id} not found`);
    return match;
  }

  async create(createDto: CreateMatchDto): Promise<Match> {
    const match = this.matchRepo.create(createDto);
    const saved = await this.matchRepo.save(match);
    this.matchesGateway.sendMatchUpdate(saved);
    return saved;
  }

  async update(id: string, updateDto: UpdateMatchDto): Promise<Match> {
    await this.matchRepo.update(id, updateDto);
    const updated = await this.findOne(id);
    this.matchesGateway.sendMatchUpdate(updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    const match = await this.findOne(id);
    await this.matchRepo.remove(match);
  }
}
