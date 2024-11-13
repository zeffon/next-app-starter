export const runtime = 'edge'

export async function POST() {
  const response = new Response(JSON.stringify({ success: true, message: '登出成功' }), {
    headers: {
      'Set-Cookie': 'token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
    },
  })
  return response
}
