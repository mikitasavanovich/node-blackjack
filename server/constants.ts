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

export const GAME_TIMEOUT_MS = 30000

export enum GAME_STATE {
  JOINING = 'JOINING',
  STARTING = 'STARTING',
  PLAYER_TURN = 'PLAYER_TURN',
  DEALER_TURN = 'DEALER_TURN',
  FINISHED = 'FINISHED'
}

export enum PLAYER_STATE {
  HAS_TURN = 'HAS_TURN',
  WAIT = 'WAIT',
  HAS_LOST = 'HAS_LOST',
  HAS_WON = 'HAS_WON'
}
