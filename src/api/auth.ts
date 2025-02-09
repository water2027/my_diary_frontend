export interface TokenItem {
  token: string
  expiry: number
}

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000 - 1000 * 60 * 60

export function getToken() {
  const itemStr = localStorage.getItem('token')

  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr) as TokenItem
  const now = new Date()

  if (now.getTime() > item.expiry) {
    localStorage.removeItem('token')
    return null
  }

  return item.token
}

export function setToken(token: string, expiry: number = SEVEN_DAYS_IN_MS) {
  const item: TokenItem = {
    token,
    expiry,
  }
  localStorage.setItem('token', JSON.stringify(item))
}
