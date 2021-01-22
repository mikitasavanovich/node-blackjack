import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { IGameContext, IGame } from '../interfaces'
import socketService from '../services/SocketService'
import { ROUTES } from '../constants'

export const GameContext = React.createContext<Partial<IGameContext>>({})

function GameContextProvider (props: { children: React.ReactNode }) {
  const [game, setGame] = useState<IGame>()

  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (game && !location.pathname.includes('/game')) {
      history.replace(ROUTES.GAME(game.id))
    }
  }, [game])

  const initSocketConnection = (token: string) => {
    socketService.new(token)

    socketService.onUpdateEvent((game) => {
      setGame(game)
    })
  }

  return (
    <GameContext.Provider value={{ game, setGame, initSocketConnection }}>
      {props.children}
    </GameContext.Provider>
  )
}

export default GameContextProvider