import { AppstoreOutlined, SettingOutlined, TagOutlined, UserOutlined } from '@ant-design/icons'

export const route = {
  path: '/',
  children: [
    {
      name: '总览',
      path: '/dashboard',
      icon: <AppstoreOutlined />,
    },
    {
      name: '用户',
      path: '/user',
      icon: <UserOutlined />,
    },
    {
      name: '设置',
      path: '/setting',
      icon: <SettingOutlined />,
    },
    {
      name: '嵌套路由',
      path: '/routes',
      icon: <TagOutlined />,
      children: [
        {
          name: '添加新页面',
          path: '/routes/edit',
        },
        {
          name: '页面列表',
          path: '/routes/list',
        },
      ],
    },
  ],
}
