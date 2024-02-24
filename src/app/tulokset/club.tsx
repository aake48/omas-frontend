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
    <div>
        <h1 className='font-medium'>{`${position}. ${name} - ${shortName}`}</h1>
            <div>
                {members.map((member, index) => (
                    <Member key={index} firstName={member.firstName} lastName={member.lastName}/>
                ))}
            </div>
    </div>
  )
}

export default Club;