'use client'

import { useRouter } from 'next/navigation'
import { Button, Form, Input, message, type FormProps } from 'antd'
import LoginService, { LoginRequest } from './service'

export default function LoginPage() {
  const [form] = Form.useForm()
  const router = useRouter()

  const onFinish: FormProps['onFinish'] = async (values: LoginRequest) => {
    const { data } = await LoginService.login(values)
    if (data.success) {
      message.success(data.message)
      router.replace('/dashboard')
    } else {
      message.error(data.message)
    }
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-x-hidden">
      <div className="m-auto w-[400px]">
        <h1 className="mb-4">欢迎登录</h1>
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 420 }}
          form={form}
          onFinish={onFinish}
          initialValues={{
            username: 'admin',
            password: '123456',
          }}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input placeholder="请输入用户名" size="large" variant="filled" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password size="large" placeholder="请输入密码" variant="filled" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" block size="large">
              登录
            </Button>
            <a href="/register">前往注册</a>
          </Form.Item>
        </Form>
      </div>
    </main>
  )
}
