import { GAME_STATE, PLAYER_STATE } from './constants'
export interface IGame {
  id: string;
  players: IPlayer[];
  state: GAME_STATE;
  dealer: IDealer;
}

export interface ICard {
  suit: string;
  value: string;
  visible: boolean;
}
export interface IPlayer {
  userId: string;
  buyInSum: number;
  bet: number;
  state: PLAYER_STATE;
  hand: ICard[];
  score: number;
}

export interface IDealer {
  hand: ICard[];
  score: number | string;
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

export interface IUserContext {
  userInfo: IUserInfo | undefined;
  setUserInfo: (userInfo: IUserInfo) => void;
}

export interface ISocketGamePayload {
  gameId?: string;
  betSum?: number;
}