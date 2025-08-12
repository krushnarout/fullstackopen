import { create } from 'zustand'

let timeoutId = null

const useNotificationStore = create(set => ({
  message: '',
  type: '',

  showNotification: (message, type = 'success', timeInSeconds = 5) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    set({ message, type })

    timeoutId = setTimeout(() => {
      timeoutId = null
      set({ message: '', type: '' })
    }, timeInSeconds * 1000)
  },

  clearNotification: () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    set({ message: '', type: '' })
  },
}))

export default useNotificationStore
