import { formatDate } from '@/utils/date-util'

export const runtime = 'edge'

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body

  if (username === 'admin' && password === '123456') {
    const formattedDate = formatDate(new Date())
    const token = `${formattedDate}:${username}`
    const response = new Response(JSON.stringify({ success: true, message: '登录成功' }), {
      headers: {
        'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
      },
    })
    return response
  } else {
    return new Response(JSON.stringify({ success: false, message: '用户名或者密码错误' }))
  }
}
