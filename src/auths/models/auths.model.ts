import { User } from '../../users/models/users.model'
import { Role } from '../auths.decorator'

export type UserWithRoles = User & {
  roles: Role[]
}

export interface Payload {
  id: string
  roles: Role[]
}
