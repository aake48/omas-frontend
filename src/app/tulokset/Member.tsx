import React from 'react'

interface MemberProps {
  name: string,
  score: number
}

const Member = ({ name, score }: MemberProps) => {
  return (
    <div className='flex gap-4 px-4'>
      <h1>{name}</h1>
      <p>{`${score.toFixed(2)}p`}</p>
    </div>
  )
}

export default Member;