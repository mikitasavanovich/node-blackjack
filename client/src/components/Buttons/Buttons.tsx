import React from 'react'
import { GAME_STATE } from '../Game/constants'
import './Buttons.css'

interface IButtonsProps {
  gameState: GAME_STATE | null;
  onStartClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  onDrawClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  onStayClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export const Buttons = (props: IButtonsProps) => {
  return (
    <div className='buttons'>
      {(!props.gameState || ![GAME_STATE.PLAYER_TURN, GAME_STATE.DEALER_TURN].includes(props.gameState)) && (
        <button className='button' onClick={props.onStartClick}>Start</button>
      )}
      {props.gameState && [GAME_STATE.PLAYER_TURN, GAME_STATE.DEALER_TURN].includes(props.gameState) && (
        <>
          <button className='button' onClick={props.onDrawClick}>Draw</button>
          <button className='button' onClick={props.onStayClick}>Stay</button>
        </>
      )}
    </div>
  )
}