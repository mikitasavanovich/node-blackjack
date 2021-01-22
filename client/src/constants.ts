export const ROUTES = {
  AUTHORIZE: '/authorize',
  LOBBY: '/lobby',
  GAME: (gameId = ':gameId') => `/game/${gameId}`
}

export const BASE_API_URL = 'http://192.168.100.18:4001'

export enum GAME_STATE {
  JOINING = 'JOINING',
  WAITING_FOR_BETS = 'WAITING_FOR_BETS',
  PLAYER_TURN = 'PLAYER_TURN',
  DEALER_TURN = 'DEALER_TURN',
  FINISHED = 'FINISHED'
}

export enum PLAYER_STATE {
  IDLE = 'IDLE',
  BETTING = 'BETTING',
  PLAYS = 'PLAYS',
  WON = 'WON',
  LOST = 'LOST'
}

export enum GAME_EVENT {
  CREATE = 'game:create',
  JOIN = 'game:join',
  START = 'game:start',
  BET = 'game:bet',
  HIT = 'game:hit',
  STAY = 'game:stay',
  FAIL = 'game:fail',
  UPDATE = 'game:update',
  LEAVE = 'game:leave'
}