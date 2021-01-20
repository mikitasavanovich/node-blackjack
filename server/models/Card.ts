export class Card {
  suit: string;
  value: string;
  visible: boolean = true;

  constructor (suit: string, value: string) {
    this.suit = suit
    this.value = value
  }

  public setCardVisibility (visible: boolean) {
    this.visible = visible
  }

  public serialize () {
    if (this.visible) {
      return {
        suit: this.suit,
        value: this.value
      }
    } else {
      return {
        suit: 'hidden',
        value: 'hidden'
      }
    }
  }
}
