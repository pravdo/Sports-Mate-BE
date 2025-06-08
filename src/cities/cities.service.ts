import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private citiesRepository: Repository<City>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<City[]> {
    const cacheKey = 'cities_all';
    const cached = await this.cacheManager.get<City[]>(cacheKey);
    if (cached) {
      return cached;
    }
    const cities = await this.citiesRepository.find();
    await this.cacheManager.set(cacheKey, cities, 3600); // Cache for 1 hour
    return cities;
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
    // const createdCities: City[] = [];
    return this.citiesRepository.save(cities);
    // for (const cityData of cities) {
    //   try {
    //     const city = await this.create(cityData);
    //     createdCities.push(city);
    //   } catch (error) {
    //     console.error(`Failed to create city ${cityData.name}:`, error);
    //   }
    // }

    // return createdCities;
  }
}
