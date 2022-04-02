import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { ConsultationType } from '../qianrens/models/qianrens.model'
import { ConsultationsService } from './consultations.service'
import { Consultation, ConsultationsConnection } from './models/consultations.model'

@Resolver(of => Consultation)
export class ConsultationsResolver {
  constructor (private readonly consultationsService: ConsultationsService) {}

  @Query(of => Consultation, { description: '获取指定的咨询' })
  async consultation (@Args('id') id: string) {
    return await this.consultationsService.consultation(id)
  }

  @Query(of => ConsultationsConnection, { description: '获取所有的咨询' })
  async consultations (@Args() args: RelayPagingConfigArgs) {
    return await this.consultationsService.consultations(args)
  }

  @ResolveField(of => [ConsultationType])
  async consultationTypes (@Parent() consultation: Consultation) {
    return await this.consultationsService.consultationTypes(consultation.id)
  }
}
