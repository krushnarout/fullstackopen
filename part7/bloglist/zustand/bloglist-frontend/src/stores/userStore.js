import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'
import persistentUser from '../services/persistentUser'

const useUserStore = create(set => ({
  user: null,

  // restores the saved session on a page reload
  initializeUser: () => {
    const user = persistentUser.getUser()
    if (user) {
      blogService.setToken(user.token)
      set({ user })
    }
  },

  login: async credentials => {
    const user = await loginService.login(credentials)
    persistentUser.saveUser(user)
    blogService.setToken(user.token)
    set({ user })
    return user
  },

  logout: () => {
    persistentUser.removeUser()
    blogService.setToken(null)
    set({ user: null })
  },
}))

export default useUserStore
