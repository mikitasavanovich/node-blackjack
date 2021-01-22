import { GAME_STATE, PLAYER_STATE } from './constants'
export interface IGame {
  id: string;
  players: IPlayer[];
  state: GAME_STATE;
}

export interface IPlayer {
  userId: string;
  buyInSum: number;
  bet: number;
  state: PLAYER_STATE;
  score: 0;
}

export interface IUserInfo {
  id: string;
  username: string;
  wallet: number;
}

export interface IGameContext {
  game: IGame | undefined;
  setGame: (game: IGame) => void;
  initSocketConnection: (token: string) => void;
}

export interface ISocketGamePayload {
  gameId?: string;
  betSum?: number;
}