import React from 'react';
import io from 'socket.io-client'
import './App.css';

function App() {
  React.useEffect(() => {
    const socket = io('http://localhost:4001', {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: 'Basic bmlraXRhMzoxMTExMTE='
          }
        }
      }
    })
  }, [])

  return (
    <div>Hello</div>
  );
}

export default App;
