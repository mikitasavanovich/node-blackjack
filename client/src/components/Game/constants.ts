export enum GAME_STATE {
  PLAYER_TURN = 1,
  DEALER_TURN,
  FINISHED,
  IDLE
}

export const MAX_SCORE = 21

export const MIN_FINISH_VALUE = 19

export const CARD_VALUES: {
  [key: string]: number
} = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  'JACK': 10,
  'QUEEN': 10,
  'KING': 10,
  'ACE1': 1,
  'ACE': 11,
}