import React from 'react'

const Header = ({ course }) => {
    return <h2>{course}</h2>
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    const total = course.parts.reduce((s, p) => s + p.exercises, 0)
    console.log(total)

    return (
        <div>
            {course.parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}
            <p>
                <strong>total of {total} exercises</strong>
            </p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content course={course} />
        </div>
    )
}

export default Course