import { Injectable } from '@nestjs/common'

import { AddCarouselArgs } from './models/carousels.model'

@Injectable()
export class CarouselsService {
  async removeCarousel (id: string) {
    throw new Error('Method not implemented.')
  }

  async addCarousel (args: AddCarouselArgs) {
    throw new Error('Method not implemented.')
  }

  async carousels (agrs: any) {
    throw new Error('Method not implemented.')
  }

  async carousel (id: string) {
    throw new Error('Method not implemented.')
  }
}
