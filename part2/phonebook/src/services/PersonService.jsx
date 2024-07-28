import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (person) => {
  const response = await axios.post(baseUrl, person)
  return response.data
}

const update = async (id, person) => {
  const response = await axios.put(`${baseUrl}/${id}`, person)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, remove, update }