import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad
  let average = (good * 1 + bad * -1) / all
  let positive = (good / all) * 100
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    console.log('clicked good button')
    setGood(good + 1)
  }

  const handleNeutral = () => {
    console.log('clicked neutral button')
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    console.log('clicked bad button')
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button text="good" handleClick={handleGood} />
        <Button text="neutral" handleClick={handleNeutral} />
        <Button text="bad" handleClick={handleBad} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App