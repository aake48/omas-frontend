import React from 'react'
import { Score as ScoreType } from './types';
import Score from './score';

export default function page() {
  const scores: ScoreType[] = [
    {
      "year": 2024,
      "divisions": [
        {
          "name": "Y-mestaruussarja",
          "clubs": [
            {
              "name": "Oulun metsästys- ja ampumaseura",
              "shortName": "OMAS",
              "position": 1,
              "members": [
                {
                  "firstName": "Etunimi",
                  "lastName": "Sukunimi"
                }
              ]
            }
          ]
        },
        {
          "name": "Y-suomisarja",
          "clubs": [
            {
              "name": "Oulun metsästys- ja ampumaseura",
              "shortName": "OMAS",
              "position": 1,
              "members": [
                {
                  "firstName": "Etunimi",
                  "lastName": "Sukunimi"
                },
                {
                  "firstName": "Etunimi",
                  "lastName": "Sukunimi"
                }
              ]
            },
            {
              "name": "Test club",
              "shortName": "TEST",
              "position": 2,
              "members": [
                {
                  "firstName": "Etunimi",
                  "lastName": "Sukunimi"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "year": 2023,
      "divisions": [
        {
          "name": "Y-mestaruussarja",
          "clubs": [
            {
              "name": "Oulun metsästys- ja ampumaseura",
              "shortName": "OMAS",
              "position": 1,
              "members": [
                {
                  "firstName": "Etunimi",
                  "lastName": "Sukunimi"
                }
              ]
            }
          ]
        },
        {
          "name": "Y-suomisarja",
          "clubs": [
            {
              "name": "Oulun metsästys- ja ampumaseura",
              "shortName": "OMAS",
              "position": 1,
              "members": [
                {
                  "firstName": "Etunimi",
                  "lastName": "Sukunimi"
                },
                {
                  "firstName": "Etunimi",
                  "lastName": "Sukunimi"
                }
              ]
            },
            {
              "name": "Test club",
              "shortName": "TEST",
              "position": 2,
              "members": [
                {
                  "firstName": "Etunimi",
                  "lastName": "Sukunimi"
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  return (
    <main className="p-2 h-screen">
      {scores.sort((a, b) => b.year - a.year).map(score => (
        <Score year={score.year} divisions={score.divisions}/>
      ))}
    </main>
  )
}