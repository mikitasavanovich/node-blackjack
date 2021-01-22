import React from 'react'
import { ICard } from '../../interfaces';
import './Card.css'

function Card(props: ICard) {
  return (
    <div className='card'>
      <div className='card__suit'>{props.suit}</div>
      <div className='card__value'>{props.value}</div>
    </div>
  )
}

export default Card