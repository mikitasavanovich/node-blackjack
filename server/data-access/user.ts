import { User } from '../models/User'

const users: User[] = []

export const createUser = (username: string, password: string): User => {
  const user = new User(username, password)

  users.push(user)

  return user
}

export const findUser = (options: { id?: string, username?: string }) => {
  const user = users.find(
    user => Object.entries(options).every(
      ([key, value]) => user[key] && user[key] === value)
  )

  return user
}
