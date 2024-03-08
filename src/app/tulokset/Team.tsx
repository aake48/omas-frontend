import React from 'react'

interface TeamProps {
  clubName: string,
  position: number
}

const Team = ({ clubName, position }: TeamProps) => {
  return (
    <div>
      <h1>{`${position + 1}. ${clubName}`}</h1>
      <div></div>
    </div>
  )
}

export default Team;