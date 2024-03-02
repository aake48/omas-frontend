import React from 'react'

interface CompetitionProps {
    name: string,
    creationDate: string
}

const Club = ({ name, creationDate }: CompetitionProps) => {
  return (
    <div>
        <h1 className='text-2xl'>{name}</h1>
        <p className='text-sm'>{creationDate}</p>
    </div>
  )
}

export default Club;