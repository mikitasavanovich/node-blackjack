export interface ICard {
  suit: string;
  value: string;
  hidden?: boolean;
}

export interface IPlayer {
  name: string;
  cards: ICard[];
  score: number;
  maxExceeded?: boolean;
}