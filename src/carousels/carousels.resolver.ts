import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { CarouselsService } from './carousels.service'
import { AddCarouselArgs, Carousel, CarouselsConnection } from './models/carousels.model'

@Resolver(of => Carousel)
export class CarouselsResolver {
  constructor (private readonly carouselsService: CarouselsService) {}

  @Query(of => Carousel, { description: '获取指定的轮播图' })
  async carousel (@Args('id')id: string) {
    return await this.carouselsService.carousel(id)
  }

  @Query(of => CarouselsConnection, { description: '获取全部轮播图' })
  async carousels (@Args() args: RelayPagingConfigArgs) {
    return await this.carouselsService.carousels(args)
  }

  @Mutation(of => Carousel, { description: '添加一个轮播图' })
  async addCarousel (@Args() args: AddCarouselArgs) {
    return await this.carouselsService.addCarousel(args)
  }

  @Mutation(of => Carousel, { description: '移除指定轮播图' })
  async removeCarousel (@Args('id') id: string) {
    return await this.carouselsService.removeCarousel(id)
  }
}
