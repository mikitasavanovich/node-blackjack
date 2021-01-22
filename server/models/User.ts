import shortid from 'shortid'

export class User {
  id: string;
  username: string;
  password: string;
  wallet: number = 15;

  constructor (username: string, password: string) {
    this.id = shortid.generate()
    this.username = username
    this.password = password
  }

  public getAuthToken (): string {
    return Buffer.from(`${this.username}:${this.password}`).toString('base64')
  }

  public validateCredentials (username: string, password: string): boolean {
    return this.username === username && this.password === password
  }

  public hasSum (sum: number) {
    return this.wallet >= sum
  }

  public setWallet (amount: number) {
    this.wallet = amount
  }

  public addToWallet (sum: number) {
    this.wallet += sum
  }

  public extractFromWallet (sum: number) {
    this.wallet -= sum
  }

  public serialize () {
    return {
      id: this.id,
      username: this.username,
      wallet: this.wallet
    }
  }
}
