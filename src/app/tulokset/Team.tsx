import React from 'react'
import Member from './Member'
import { competitionResultsUser } from '@/types/commonTypes'

interface TeamProps {
  teamDisplayName: string,
  position: number,
  scores: competitionResultsUser[] | null
}

const Team = ({ teamDisplayName, position, scores }: TeamProps) => {
  if (scores !== null) {
    return (
      <div data-testid={`team-${position}`}>
        <h1 className='font-medium'>{`${position + 1}. ${teamDisplayName}`}</h1>
        <div>
          {scores.map((member, index) => (
            <Member
              key={index}
              name={member.name}
              score={member.sum}
            />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h1 className='font-medium'>{`${position + 1}. ${teamDisplayName}`}</h1>
        <div>
          <p>Virhe joukkueen jäsenten haussa</p>
        </div>
      </div>
    )
  }
}

export default Team;