import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private citiesRepository: Repository<City>,
  ) {}

  async findAll(): Promise<City[]> {
    return this.citiesRepository.find();
  }

  async findOne(id: number): Promise<City> {
    const city = await this.citiesRepository.findOne({ where: { id } });
    if (!city) {
      throw new Error(`City with id ${id} not found`);
    }
    return city;
  }

  async findByName(name: string): Promise<City | null> {
    const city = await this.citiesRepository.findOne({ where: { name } });
    return city || null;
  }

  async create(createCityDto: CreateCityDto): Promise<City> {
    // Check if city already exists
    const existingCity = await this.findByName(createCityDto.name);
    if (existingCity) {
      return existingCity;
    }

    const city = this.citiesRepository.create(createCityDto);
    return this.citiesRepository.save(city);
  }

  async createMany(cities: CreateCityDto[]): Promise<City[]> {
    const createdCities: City[] = [];

    for (const cityData of cities) {
      try {
        const city = await this.create(cityData);
        createdCities.push(city);
      } catch (error) {
        console.error(`Failed to create city ${cityData.name}:`, error);
      }
    }

    return createdCities;
  }
}
