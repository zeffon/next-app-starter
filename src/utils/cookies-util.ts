export const extractToken = (cookies: string) => {
  const cookieArray = cookies.split('; ')
  for (let i = 0; i < cookieArray.length; i++) {
    const [key, value] = cookieArray[i].split('=')
    if (key === 'token') {
      return value
    }
  }
  return null
}

export const parseToken = (token: string) => {
  const [data, _] = token.split(':')
  const [date, username] = data.split(':')
  return [date, username]
}
