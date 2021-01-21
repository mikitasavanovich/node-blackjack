import { BASE_API_URL } from '../constants'

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