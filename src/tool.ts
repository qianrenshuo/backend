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
