import { Module } from '@nestjs/common';
import { CarouselsResolver } from './carousels.resolver';
import { CarouselsService } from './carousels.service';

@Module({
  providers: [CarouselsResolver, CarouselsService]
})
export class CarouselsModule {}
