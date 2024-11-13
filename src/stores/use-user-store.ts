import { create } from 'zustand'

export const useUserStore = create<any, any>((set) => ({
  user: undefined,
  setUser: (username: string) => {
    set(() => ({ user: username }))
  },
  queryUser: async () => {
    setTimeout(async () => {
      set(() => ({ user: '你好' }))
    }, 3000)
  },
}))
