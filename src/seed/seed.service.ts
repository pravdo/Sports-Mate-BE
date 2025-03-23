import { Injectable, Logger } from '@nestjs/common';
import { CitiesService } from '../cities/cities.service';
import { CreateCityDto } from '../cities/dto/create-city.dto';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly citiesService: CitiesService) {}

  async seedCities(): Promise<void> {
    const cities: CreateCityDto[] = [
      {
        name: 'Sofia',
        country: 'Bulgaria',
        timezone: 'Europe/Sofia',
        latitude: 42.6977,
        longitude: 23.3219,
      },
      {
        name: 'Plovdiv',
        country: 'Bulgaria',
        timezone: 'Europe/Sofia',
        latitude: 42.1419,
        longitude: 24.7501,
      },
      {
        name: 'Varna',
        country: 'Bulgaria',
        timezone: 'Europe/Sofia',
        latitude: 43.2141,
        longitude: 27.9147,
      },
      {
        name: 'Burgas',
        country: 'Bulgaria',
        timezone: 'Europe/Sofia',
        latitude: 42.5048,
        longitude: 27.4626,
      },
      {
        name: 'Ruse',
        country: 'Bulgaria',
        timezone: 'Europe/Sofia',
        latitude: 43.8537,
        longitude: 25.9664,
      },
      {
        name: 'Stara Zagora',
        country: 'Bulgaria',
        timezone: 'Europe/Sofia',
        latitude: 42.424,
        longitude: 25.6126,
      },
      {
        name: 'Pleven',
        country: 'Bulgaria',
        timezone: 'Europe/Sofia',
        latitude: 43.4067,
        longitude: 24.6174,
      },
      {
        name: 'Sliven',
        country: 'Bulgaria',
        timezone: 'Europe/Sofia',
        latitude: 42.6861,
        longitude: 26.315,
      },
      {
        name: 'Dobrich',
        country: 'Bulgaria',
        timezone: 'Europe/Sofia',
        latitude: 43.5721,
        longitude: 27.8273,
      },
      {
        name: 'Veliko Tarnovo',
        country: 'Bulgaria',
        timezone: 'Europe/Sofia',
        latitude: 43.0757,
        longitude: 25.6172,
      },
    ];

    const createdCities = await this.citiesService.createMany(cities);
    this.logger.log(`Seeded ${createdCities.length} Bulgarian cities`);
  }

  async seed(): Promise<void> {
    this.logger.log('Starting seed...');
    await this.seedCities();
    this.logger.log('Seed completed!');
  }
}
