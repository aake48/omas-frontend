import React from 'react'
import { Member as MemberType } from './types';
import Member from './member';

interface ClubProps {
    name: string,
    shortName: string,
    position: number,
    members: MemberType[]
}

const Club = ({ name, shortName, position, members }: ClubProps) => {
  return (
    <div className='h-full p-4 bg-slate-200 rounded-md mb-2 shadow-md ml-16'>
        <h1 className='font-medium'>{`${position}. ${name} - ${shortName}`}</h1>
            <div>
                {members.map(member => (
                    <Member firstName={member.firstName} lastName={member.lastName}/>
                ))}
            </div>
    </div>
  )
}

export default Club;