import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import io from 'socket.io-client'
import Authorize from '../Authorize/Authorize'
import { ROUTES } from '../../constants'
import './App.css';

function App() {
  // React.useEffect(() => {
  //   const socket = io('http://localhost:4001', {
  //     transportOptions: {
  //       polling: {
  //         extraHeaders: {
  //           Authorization: 'Basic bmlraXRhMzoxMTExMTE='
  //         }
  //       }
  //     }
  //   })
  // }, [])

  return (
    <div className='app'>
      <Switch>
        <Route exact path={ROUTES.AUTHORIZE} component={Authorize} />
        <Redirect to={ROUTES.AUTHORIZE} />
      </Switch>
    </div>
  );
}

export default App;
