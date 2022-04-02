import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'

@ObjectType({ description: '轮播图' })
export class Carousel {
  @Field(of => String, { description: '创建时间' })
    createdAt: string

  @Field(of => String, { description: '标题' })
    title: string

  @Field(of => String, { description: '前景图' })
    foregroundImageUrl: string
}

@ObjectType()
export class CarouselsConnection extends Connection<Carousel>(Carousel) {}

@ArgsType()
export class AddCarouselArgs {
  @Field()
    title: string
}
