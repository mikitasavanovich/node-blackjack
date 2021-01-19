import * as playerData from '../data-access/player'

export const signUp = (username: string, password: string): string | null => {
  const existingUser = playerData.findPlayer({ username })

  if (existingUser) {
    return
  }

  const player = playerData.createPlayer(username, password)

  return player.getAuthToken()
}
