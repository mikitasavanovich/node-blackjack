import React from 'react'
import { Card } from '../Card/Card'
import { ICard } from '../../interfaces'
import './Player.css'

interface IPlayerProps {
  cards: ICard[];
  name: string;
  score: number;
}

export const Player = ({ cards, name, score }: IPlayerProps) => {
  const hasHiddenCards = cards.some(card => card.hidden)

  return (
    <div className='player'>
      <span className='player__info'>
        <span className='player__name'>{name}: </span>
        <div className='player__hand'>
          {cards.map(card => <Card key={`${card.value}-${card.suit}`} card={card} />)}
        </div>
      </span>
      {!hasHiddenCards && (
        <div className='player__score'>
          Score: {score}
        </div>
      )}
    </div>
  )
}