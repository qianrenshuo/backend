import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

import { MAYBE_AUTH_KEY, NO_AUTH_KEY, Role, ROLES_KEY } from './auths.decorator'
import { UserWithRoles } from './models/auths.model'

interface Props {
  roles: Role[]
  maybeAuth: boolean
}

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor (
    private readonly reflector: Reflector
  ) {}

  async canActivate (context: ExecutionContext): Promise<any> {
    const noAuth = this.reflector.get<boolean>(NO_AUTH_KEY, context.getHandler())
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler()) || [Role.User]
    // 请求头有token时，请求用户数据，没有则返回null;
    const maybeAuth = this.reflector.get<boolean>(MAYBE_AUTH_KEY, context.getHandler()) || false

    if (noAuth) return true

    const guard = new (RoleGuard({ roles, maybeAuth }))()

    const canActive = await guard.canActivate(context)

    return canActive
  }
}

export const RoleGuard = ({ roles, maybeAuth }: Props) => {
  return class GqlAuthGuard extends AuthGuard('jwt') {
    getRequest (context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context)
      const { req } = ctx?.getContext()
      if (!req) {
        throw new ForbiddenException('undefined')
      }
      return req
    }

    handleRequest<TUser = any>(err: any, user: (UserWithRoles | null), info: any, context: any, status?: any): TUser {
      if (err) throw err
      if (!user && !maybeAuth) throw new UnauthorizedException('Not authorized')
      if (!user && maybeAuth) return null
      const notIncludes = roles.filter(r => !user.roles.includes(r))
      if (notIncludes.length === roles.length) {
        throw new UnauthorizedException(`${user.id} not in [${notIncludes.toString()}] roles.`)
      }

      return user as unknown as any
    }
  }
}
