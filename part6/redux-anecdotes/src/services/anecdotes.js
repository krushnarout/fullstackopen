import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id, updatedAnecdote) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const currentAnecdote = response.data
  const anecdoteToUpdate = {
    ...currentAnecdote,
    votes: updatedAnecdote.votes
  }
  const updateResponse = await axios.put(`${baseUrl}/${id}`, anecdoteToUpdate)
  return updateResponse.data
}

export default { getAll, createNew, update }