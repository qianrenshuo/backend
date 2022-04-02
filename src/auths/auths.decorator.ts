import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext()?.req?.user
  }
)

export const ROLES_KEY = 'roles'
export const NO_AUTH_KEY = 'no-auth'
export const CHECK_POLICIES_KEY = 'check_policy'
export const MAYBE_AUTH_KEY = 'maybe-auth'

/**
 * 不要求检验token
 */
export const NoAuth = () => SetMetadata(NO_AUTH_KEY, true)
/**
 * authorization中存在token时会获取用户信息
 */
export const MaybeAuth = () => SetMetadata(MAYBE_AUTH_KEY, true)
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)

export enum Role {
  User = 'User',
  Admin = 'Admin',
  None = 'None'
}
