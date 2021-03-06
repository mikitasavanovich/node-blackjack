import React, { useEffect, useState } from 'react'
import * as ApiService from '../../services/ApiService'
import Profile from '../Profile/Profile'
import { GAME_EVENT } from '../../constants'
import { IGame } from '../../interfaces'
import './Lobby.css'
import socketService from '../../services/SocketService'

function Lobby() {
  const [games, setGames] = useState<IGame[]>([])

  const fetchGames = async () => {
    const games = await ApiService.getGames()
    setGames(games)
  }

  useEffect(() => {
    fetchGames()
  }, [])

  const createGame = () => {
    socketService.emitGameEvent(GAME_EVENT.CREATE, {})
  }

  const joinGame = (gameId: string) => {
    socketService.emitGameEvent(GAME_EVENT.JOIN, { gameId })
  }
 
  return (
    <div className='lobby'>
      <Profile />
      <ul className='lobby__games'>
        {games.map(game => (
          <li key={game.id} className='lobby__game game-summary' onClick={() => joinGame(game.id)}>
            <div className='game-summary__id'>
              {game.id}
            </div>
            <div className='game-summary__players'>
              Joined players: {game.players.length}
            </div>
          </li>
        ))}
      </ul>
      <div className='lobby__buttons'>
        <button className='button' onClick={createGame}>Create</button>
      </div>
    </div>
  )
}

export default Lobby