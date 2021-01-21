import React, { FormEvent, useState } from 'react'
import * as ApiService from '../../services/ApiService'
import './Authorize.css'

enum STATE {
  SIGN_UP = 'signup',
  SIGN_IN = 'signin'
}

function Authorize() {
  const [state, setState] = useState(STATE.SIGN_UP)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let data;

    if (state === STATE.SIGN_UP) {
      data = await ApiService.signUp(username, password)
    } else {
      data = await ApiService.signIn(username, password)
    }

    if (data) {
      localStorage.setItem('TOKEN', data.token)
    }
  }

  const toggleState = () => {
    setState(state === STATE.SIGN_IN ? STATE.SIGN_UP : STATE.SIGN_IN)
  }

  return (
    <div className='authorize'>
      <h3>{state === STATE.SIGN_UP ? 'Sign Up' : 'Sign In'}</h3>
      <form className='authorize__form' onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' required className='authorize__username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type='password' placeholder='Password' required className='authorize__password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className='authorize__buttons'>
          <button className='button authorize__button' type='submit'>Submit</button>
          <button className='button button--text authorize__button' onClick={toggleState} type='button'>{state === STATE.SIGN_UP ? 'Sign Up' : 'Sign In'}</button>
        </div>
      </form>
    </div>
  )
}

export default Authorize