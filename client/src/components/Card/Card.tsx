import React from 'react'
import { ICard } from '../../interfaces'
import './Card.css'

interface ICardProps {
  card: ICard
}

export const Card = ({ card }: ICardProps) => {
  return (
    <div className='card'>
      {card.hidden ? (
        <span>Hidden</span>
      ) : (
        <>
          <span className='card__value'>{card.value}</span>
          <span className='card__suit'>{card.suit}</span>
        </>
      )}
    </div>
  )
}
