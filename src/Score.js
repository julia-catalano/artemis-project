import React from 'react'

const Score = (props) => {
  const {score, lifecycle, category, threshold} = props
  return (
    <div>
      <h2>current lifecycle: {lifecycle}</h2>
      <h2>current category: {category}</h2>
      <p>threshold: {threshold}</p>
      <div className="score-bracket">
        <h3>Score:</h3>
        <p className="water">water: {score.water}</p>
        <p>sun: {score.sun}</p>
        <p>nutrients: {score.nutrients}</p>
      </div>
    </div>
  )
}

export default Score
