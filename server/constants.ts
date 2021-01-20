export enum CARD_SUIT {
  DIAMONDS = 'diamonds',
  CLUBS = 'clubs',
  HEARTS = 'hearts',
  SPADES = 'spades'
}

export enum CARD_VALUE {
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
  ACE = 'ACE'
}

export const CARD_SCORES = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  JACK: 10,
  QUEEN: 10,
  KING: 10,
  ACE1: 1,
  ACE11: 11
}

export const GAME_TIMEOUT_MS = 3000000
export const GAME_BUY_IN_SUM = 1
export const GAME_MAX_VALUE = 21
export enum WINNING_RATE {
  USUAL = 2,
  NATURAL = 1.5,
  PUSH = 1
}

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

export enum GAME_EVENTS {
  BET = 'bet',
  DRAW = 'draw',
  STAY = 'stay',
  FINISH = 'finish',
  LEAVE = 'leave'
}
