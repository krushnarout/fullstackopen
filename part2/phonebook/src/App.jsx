import { useState } from "react"

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target)
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
  }

  const searchPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={search} onChange={handleSearchChange}></input>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searchPersons.map((person) => (
        <div key={person.name}>{person.name} {person.number}</div>
      ))}
    </div>
  )
}

export default App
