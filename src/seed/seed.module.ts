import { Module } from '@nestjs/common';
import { CitiesModule } from 'src/cities/cities.module';
import { SeedService } from './seed.service';

@Module({
  imports: [CitiesModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
