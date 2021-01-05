import React from 'react'
import './Scoreboard.css'

const Scoreboard = props => {
  const { score, highScore, maxScore } = props
  return (
    <ul className="Scores">
      <li className="scoreboard-title">
        <h3>Score:</h3>
        <p>{score}</p>
      </li>
      <li className="scoreboard-title">
        <h3>High Score:</h3>
        <p>{highScore}</p>
      </li>
      <li className="scoreboard-title">
        <h3>Max Score: </h3>
        <p>{maxScore}</p>
      </li>
    </ul>
  )
}

export default Scoreboard
