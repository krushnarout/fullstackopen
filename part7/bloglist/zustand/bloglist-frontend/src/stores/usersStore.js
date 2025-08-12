import { create } from 'zustand'
import userService from '../services/users'

// holds the list of all users shown in the users view,
// separate from userStore which holds the signed in user
const useUsersStore = create(set => ({
  users: [],

  initializeUsers: async () => {
    const users = await userService.getAll()
    set({ users })
  },
}))

export default useUsersStore
