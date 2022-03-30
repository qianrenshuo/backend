import * as crypto from 'crypto'

export function sha256 (content: crypto.BinaryLike) {
  const h = crypto.createHash('sha256')
  h.update(content)
  return h.digest('hex')
}

export const now = () => new Date().toISOString()

export const sleep = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))
