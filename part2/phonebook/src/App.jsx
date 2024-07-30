import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import PersonService from "./services/PersonService"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    PersonService.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        PersonService.update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response))
            setMessage(`Changed ${newName}'s number`)
            setIsError(false)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setNewName("")
            setNewNumber("")
          }).catch(eror => {
            setMessage(`Information of ${newName} has already been removed from the server`)
            setIsError(true)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      PersonService.create(newPerson).then(response => {
        setPersons(persons.concat(response))
        setMessage(`Added ${newName}`)
        setIsError(false)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName("")
        setNewNumber("")
      })
    }
  }

  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find((person) => person.id === id).name} ?`)) {
      PersonService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }

  const searchPersons = persons.filter((person) => {
    if (person.name && typeof person.name === 'string') {
      return person.name.toLowerCase().includes(search.toLowerCase())
    }
    return false
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} isError={isError} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons searchPersons={searchPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App
