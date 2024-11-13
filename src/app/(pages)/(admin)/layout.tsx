'use client'

import React, { useEffect, useState } from 'react'
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import { ProLayout, PageContainer } from '@ant-design/pro-components'
import { usePathname, useRouter } from 'next/navigation'
import { Dropdown, message } from 'antd'
import { route } from '@/config/menu-data'
import { siteConfig } from '@/config/site'
import LoginService from '../(auth)/login/service'

export interface MenuItem {
  name: string
  path: string
  icon?: React.ReactNode
  children?: MenuItem[]
}

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const site = siteConfig

  const [openKeys, setOpenKeys] = useState<string[]>([])

  const handleMenuSelect = ({ key }: { key: string }) => {
    router.push(key)
  }

  const handleMenuOpen = (openKeys: string[]) => {
    setOpenKeys(openKeys)
  }

  useEffect(() => {
    const pathNameArray = pathname?.split('/') ?? []
    if (pathNameArray.length > 2) {
      setOpenKeys([...openKeys, `/${pathNameArray[1]}`])
    }
  }, [pathname])

  const handleLogout = async () => {
    const { data } = await LoginService.logout()
    if (data.success) {
      message.success(data.message)
      router.replace('/login')
    }
  }

  const treeToList = (data: MenuItem[]) => {
    const arr: MenuItem[] = []
    const formatData = (data: MenuItem[]) => {
      data.forEach((item) => {
        arr.push({ path: item.path, name: item.name })
        if (item.children) {
          formatData(item.children)
        }
      })
    }
    formatData(data)
    return arr
  }

  const flatMenu = treeToList(route.children as MenuItem[])

  /** 预加载菜单 */
  useEffect(() => {
    flatMenu.forEach((item) => {
      router.prefetch(item.path)
    })
  }, [])

  return (
    <ProLayout
      route={route}
      layout="mix"
      title={site.name}
      pageTitleRender={false}
      breadcrumbRender={() => []}
      menuProps={{
        onSelect: handleMenuSelect,
        onOpenChange: handleMenuOpen,
        selectedKeys: [pathname],
        openKeys: openKeys,
      }}
      footerRender={() => <div className="pb-5 text-center text-gray-400">{site.copyright}</div>}
      avatarProps={{
        src: 'https://avatars.githubusercontent.com/u/33784785',
        size: 'small',
        title: site.name,
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'setting',
                    icon: <SettingOutlined />,
                    label: '设置',
                    onClick: () => handleMenuSelect({ key: 'setting' }),
                  },
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                    onClick: handleLogout,
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          )
        },
      }}
    >
      <PageContainer
        token={{
          paddingBlockPageContainerContent: 24,
          paddingInlinePageContainerContent: 24,
        }}
      >
        {children}
      </PageContainer>
    </ProLayout>
  )
}

export default AdminLayout
