import shortid from 'shortid'

export class Player {
  id: string;
  username: string;
  password: string;
  wallet: number = 0;

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
}
