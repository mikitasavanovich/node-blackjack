import React, { FormEvent, useContext, useState } from 'react'
import Card from './Card'
import { GameContext } from '../../context/Game'
import { withProfile } from '../Profile/Profile'
import { IUserInfo } from '../../interfaces'
import './Game.css'
import { GAME_EVENT, GAME_STATE, PLAYER_STATE } from '../../constants'
import socketService from '../../services/SocketService'

interface IGameProps {
  userInfo: IUserInfo
}

function Game (props: IGameProps) {
  const [bet, setBet] = useState<number>(0)
  const { game } = useContext(GameContext)
  
  if (!game) {
    return null;
  }

  const player = game.players.find(p => p.userId === props.userInfo.id)

  const startGame = () => {
    socketService.emitGameEvent(GAME_EVENT.START, { gameId: game.id })
  }

  const hit = () => {
    socketService.emitGameEvent(GAME_EVENT.HIT, { gameId: game.id })
  }

  const stay = () => {
    socketService.emitGameEvent(GAME_EVENT.STAY, { gameId: game.id })
  }

  const placeBet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socketService.emitGameEvent(GAME_EVENT.BET, { gameId: game.id, betSum: bet })
  }

  return (
    <div className='game'>
      <div className='game__header'>
        <span>Game {game.id}</span>
        <span>State: {game.state}</span>
      </div>
      <div className='game__board'>
        <div className='game__dealer dealer'>
          {game.dealer && (
            <>
              <h4>Dealer</h4>
              <div className='dealer__hand'>
                {game.dealer.hand.map(card => (
                  <Card key={card.suit + card.value} {...card} />
                ))}
              </div>
              <div className='dealer__score'>
                Score: {game.dealer.score}
              </div>
            </>
          )}
        </div>
        <div className='game__players'>
          {game.players.map((player, i) => (
            <div key={player.userId} className='game__player player'>
              <div className='player__header'>
                <h4>Player {i + 1} {props.userInfo.id === player.userId && '(You)'}</h4>
                <div className='player__money'>
                  <div className='player__bet'>Current bet: {player.bet}</div>
                  <div className='player__buyInSum'>Available sum: {player.buyInSum}</div>
                </div>
              </div>
              <div className='player__hand'>
                {player.hand.map(card => (
                  <Card key={card.suit + card.value} {...card} />
                ))}
              </div>
              <div className='player__score'>
                Score: {player.score}
              </div>
            </div>
          ))}
        </div>
        <div className='game__buttons'>
          {game.state === GAME_STATE.JOINING && (
            <button className='button' onClick={startGame}>Start</button>
          )}
          {game.state === GAME_STATE.WAITING_FOR_BETS && (
            <>
              {player?.bet === 0 && (
                <form onSubmit={placeBet}>
                  <input type='number' value={bet} onChange={(e) => setBet(+e.target.value)} />
                  <button type='submit'>Place bet</button>
                </form>
              )}
              {player?.bet && player.bet > 0 && (
                <div>bet accepted</div>
              )}
            </>
          )}
          {game.state === GAME_STATE.PLAYER_TURN && player?.state === PLAYER_STATE.PLAYS && (
            <>
              <button className='button' onClick={hit}>Hit</button>
              <button className='button' onClick={stay}>Stay</button>
            </>
          )}
          {game.state === GAME_STATE.FINISHED && (
            <button className='button' onClick={startGame}>Start again</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default withProfile(Game)