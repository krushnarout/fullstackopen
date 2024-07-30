const Person = ({ person, onDelete }) => {

  const buttonStyle = {
    marginLeft: '10px',
  }

  return (
    <div>
      {person.name} {person.number}
      <button style={buttonStyle} onClick={() => onDelete(person.id)}>delete</button>
    </div>
  )
}

export default Person
