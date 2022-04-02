import { Module } from '@nestjs/common'

import { ConsultationsResolver } from './consultations.resolver'
import { ConsultationsService } from './consultations.service'

@Module({
  providers: [ConsultationsResolver, ConsultationsService]
})
export class ConsultationsModule {}
