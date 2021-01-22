import { BASE_API_URL } from '../constants'
import { IGame, IUserInfo } from '../interfaces'

export const signUp = async (username: string, password: string): Promise<{ token: string } | null> => {
  const response = await fetch(`${BASE_API_URL}/api/sign-up`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.ok ? response.json() : null
}

export const signIn = async (username: string, password: string): Promise<{ token: string } | null> => {
  const response = await fetch(`${BASE_API_URL}/api/sign-in`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.ok ? response.json() : null
}

export const getGames = async (): Promise<IGame[]> => {
  const token = localStorage.getItem('TOKEN')
  const response = await fetch(`${BASE_API_URL}/api/games?state=JOINING`, {
    headers: {
      'Authorization': `Basic ${token}`
    }
  })

  return response.ok ? response.json() : []
}

export const createGame = async (): Promise<IGame> => {
  const token = localStorage.getItem('TOKEN')
  const response = await fetch(`${BASE_API_URL}/api/games`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${token}`
    }
  })

  return response.ok ? response.json() : []
}

export const getUserInfo = async (): Promise<IUserInfo> => {
  const token = localStorage.getItem('TOKEN')
  const response = await fetch(`${BASE_API_URL}/api/user/info`, {
    headers: {
      'Authorization': `Basic ${token}`
    }
  })

  return response.ok ? response.json() : null
}