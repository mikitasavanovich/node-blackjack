import * as userData from '../data-access/user'

export const signUp = (username: string, password: string): string | null => {
  const existingUser = userData.findUser({ username })

  if (existingUser) {
    return
  }

  const user = userData.createUser(username, password)

  return user.getAuthToken()
}

export const signIn = (username: string, password: string): string | null => {
  const user = userData.findUser({ username })

  if (!user) {
    return
  }

  if (!user.validateCredentials(username, password)) {
    return
  }

  return user.getAuthToken()
}
