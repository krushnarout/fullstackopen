import Person from "./Person"

const Persons = ({ searchPersons }) => {
  return (
    <div>
      {searchPersons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  )
}

export default Persons
