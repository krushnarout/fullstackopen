import Person from "./Person"

const Persons = ({ searchPersons, onDelete }) => {
  return (
    <div>
      {searchPersons.map((person) => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default Persons
