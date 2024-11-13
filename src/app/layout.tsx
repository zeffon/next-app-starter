'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ProConfigProvider } from '@ant-design/pro-components'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'
import React from 'react'
import './globals.css'

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="zh-cn">
      <body>
        <AntdRegistry>
          <ConfigProvider locale={zhCN}>
            <ProConfigProvider>{children}</ProConfigProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}

export default RootLayout
