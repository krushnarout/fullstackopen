import { create } from 'zustand'
import userService from '../services/users'

// holds the list of all users shown in the users views,
// separate from userStore which holds the signed in user
const useUsersStore = create(set => ({
  users: [],
  // lets a view tell "not fetched yet" apart from "fetched, but no match"
  initialized: false,

  initializeUsers: async () => {
    const users = await userService.getAll()
    set({ users, initialized: true })
  },
}))

export default useUsersStore
