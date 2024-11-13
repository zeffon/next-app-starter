'use client'

import { useRouter } from 'next/navigation'
import { Button, Form, Input, message, type FormProps } from 'antd'

export default function RegisterPage() {
  const [form] = Form.useForm()
  const router = useRouter()

  const onFinish: FormProps['onFinish'] = (values: any) => {
    message.success('注册成功')
    router.replace('/login')
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-x-hidden">
      <div className="m-auto w-[400px]">
        <h1 className="mb-4">用户注册</h1>
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 420 }}
          form={form}
          onFinish={onFinish}
          initialValues={{
            username: '',
            password: '',
            confirmPassword: '',
          }}
          autoComplete="off"
        >
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="请输入用户名" size="large" variant="filled" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password size="large" placeholder="请输入密码" variant="filled" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: '请输入确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('确认密码与密码不一致，请重新输入!'))
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="请输入确认密码" variant="filled" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" block size="large">
              注册
            </Button>
            <a href="/login">立即登录</a>
          </Form.Item>
        </Form>
      </div>
    </main>
  )
}
