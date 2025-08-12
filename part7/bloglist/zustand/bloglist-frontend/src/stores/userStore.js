import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'

const STORAGE_KEY = 'loggedUser'

const useUserStore = create(set => ({
  user: null,

  // restores the session saved in localStorage on a page reload
  initializeUser: () => {
    const storedUser = window.localStorage.getItem(STORAGE_KEY)
    if (storedUser) {
      const user = JSON.parse(storedUser)
      blogService.setToken(user.token)
      set({ user })
    }
  },

  login: async credentials => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    blogService.setToken(user.token)
    set({ user })
    return user
  },

  logout: () => {
    window.localStorage.removeItem(STORAGE_KEY)
    blogService.setToken(null)
    set({ user: null })
  },
}))

export default useUserStore
