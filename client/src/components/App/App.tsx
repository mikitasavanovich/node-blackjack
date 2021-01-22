import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Authorize from '../Authorize/Authorize'
import Lobby from '../Lobby/Lobby'
import Game from '../Game/Game'
import { ROUTES } from '../../constants'
import './App.css';
import { GameContext } from '../../context/Game';

function App() {
  const { initSocketConnection } = useContext(GameContext)
  const token = localStorage.getItem('TOKEN')

  useEffect(() => {
    if (token) {
      initSocketConnection && initSocketConnection(token)
    }
  }, [token])

  return (
    <div className='app'>
      <Switch>
        <Route exact path={ROUTES.AUTHORIZE} component={Authorize} />
        <Route exact path={ROUTES.LOBBY} component={Lobby} />
        <Route exact path={ROUTES.GAME()} component={Game} />
        <Redirect to={token ? ROUTES.LOBBY : ROUTES.AUTHORIZE} />
      </Switch>
    </div>
  );
}

export default App;
