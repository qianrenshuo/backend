import { Module } from '@nestjs/common'

import { SubjectsResolver } from './subjects.resolver'
import { SubjectsService } from './subjects.service'

@Module({
  providers: [SubjectsResolver, SubjectsService]
})
export class SubjectsModule {}
