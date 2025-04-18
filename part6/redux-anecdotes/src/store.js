import { configureStore } from '@reduxjs/toolkit'
import anecdotesService from './services/anecdotes'
import anecdoteReducer, { setAnecdote } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

anecdotesService.getAll().then(anecdotes =>
  store.dispatch(setAnecdote(anecdotes))
)

export default store