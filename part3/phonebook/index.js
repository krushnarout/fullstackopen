const express = require('express')
const app = express()
const port = 3001

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const numberOfPersons = persons.length

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${numberOfPersons} people</p> <p>${new Date()}</p>`)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})