import React from 'react'

interface MemberProps {
    firstName: string,
    lastName: string
}

const Member = ({ firstName, lastName }: MemberProps) => {
  return (
    <div className='flex'>
        <p className='ml-8'>{firstName}</p>
        <p className='ml-8'>{lastName}</p>
    </div>
  )
}

export default Member;