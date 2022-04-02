import { ForbiddenException } from '@nestjs/common'
import axios from 'axios'
import * as crypto from 'crypto'

export function sha256 (content: crypto.BinaryLike) {
  const h = crypto.createHash('sha256')
  h.update(content)
  return h.digest('hex')
}

export const now = () => new Date().toISOString()

export const sleep = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

export async function code2Session (code: string) {
  const appId = process.env.APP_ID
  const secret = process.env.APP_SECRET
  const grantType = 'authorization_code'
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=${grantType}`

  const res = await axios
    .get(url)
    .then(r => r.data as unknown as {
      openid: string
      session_key: string
      unionid: string
      errcode: number
      errmsg: string
    })

  if (res.errcode && res.errcode !== 0) {
    throw new ForbiddenException(`code2Session error: ${res.errmsg}`)
  }

  return {
    openId: res.openid,
    unionId: res.unionid,
    sessionKey: res.session_key,
    errcode: res.errcode,
    errmsg: res.errmsg
  } as unknown as {
    openId: string
    unionId: string
    sessionKey: string
    errmsg: string
    errcode: number
  }
}

export interface RelayfyArrayParam <T extends {createdAt: string}>{
  totalCount: Array<{count: number}>
  objs: T[]
  startO: Array<{createdAt: string}>
  endO: Array<{createdAt: string}>
  first: number
  after: string | null
}

export const relayfyArrayForward = function<T extends {createdAt: string}> ({
  totalCount,
  objs,
  startO,
  endO,
  first,
  after
}: RelayfyArrayParam<T>) {
  const _lastO = objs?.slice(-1)[0]
  const _totalCount = totalCount[0]?.count ?? 0
  const _startO = startO[0]
  const _endO = endO[0]

  const v = _totalCount !== 0
  const hasNextPage = _endO?.createdAt !== _lastO?.createdAt && _endO?.createdAt !== after && objs?.length === first && _totalCount !== first
  const hasPreviousPage = after !== _startO?.createdAt && !!after

  return {
    totalCount: _totalCount,
    pageInfo: {
      startCursor: atob(objs[0]?.createdAt),
      endCursor: atob(_lastO?.createdAt),
      hasNextPage: hasNextPage && v,
      hasPreviousPage: hasPreviousPage && v
    },
    edges: edgifyByCreatedAt<T>(objs ?? [])
  }
}

export const edgifyByCreatedAt = function <T extends {createdAt: string}>(vs: T[]) {
  return vs.map(v => ({ node: v, cursor: atob(v.createdAt) }))
}

export const atob = function (content?: string | null): string | null {
  if (!content) return null
  return Buffer.from(content, 'utf-8').toString('base64')
}

export const btoa = function (content?: string | null): string | null {
  if (!content) return null
  return Buffer.from(content, 'base64').toString('utf-8')
}

export const handleRelayPagingAfter = function (after?: string | null): string | null {
  return btoa(after)
}

export const handleRelayPagingBefore = function (before?: string | null): string | null {
  return btoa(before)
}

export const handleRelayPagingArgs = function (after?: string | null, before?: string | null) {
  return {
    after: btoa(after),
    before: btoa(before)
  }
}
