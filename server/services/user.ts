import { User } from '../models/User'

export const addToWallet = (sum: number, user: User) => {
  user.addToWallet(sum)

  return user
}
