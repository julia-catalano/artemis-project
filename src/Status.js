import React from 'react'

const Status = (props) => {
  console.log('props', props.status)
  if (props.status === "won") {
    return(
      <div>
        <p>Congrats, you've reached fruit!</p>
      </div>
    )
  }
  else if (props.status === "lost") {
    return (
      <div>
        <p>Oops, your plant died from lack of{props.losingCat}.</p>

      </div>
    )
  }
  else return <div>''</div>
}

export default Status
