import shortid from 'shortid'
import { Deck } from './Deck'
import { Player } from './Player'
import { GAME_TIMEOUT_MS, GAME_STATE } from '../constants'
import { PlayerGameState } from './PlayerGameState'

export class Game {
  id = shortid.generate()
  players: PlayerGameState[] = [];
  deck: Deck;
  timeoutMS = GAME_TIMEOUT_MS
  state = GAME_STATE.JOINING

  public hasPlayer (player: Player) {
    return this.players.find(playerState => playerState.playerId === player.id)
  }

  public addPlayer (player: Player) {
    const playerGameState = new PlayerGameState(player)
    this.players.push(playerGameState)
  }

  public serialize () {
    return {
      id: this.id,
      players: this.players,
      deck: this.deck ? this.deck.serialize() : null,
      state: this.state
    }
  }
}
