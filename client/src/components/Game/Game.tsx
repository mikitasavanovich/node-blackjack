import React from 'react'
import { Player } from '../Player/Player'
import { Buttons } from '../Buttons/Buttons'
import service from '../../service'
import { GAME_STATE, CARD_VALUES, MAX_SCORE, MIN_FINISH_VALUE } from './constants'
import './Game.css'
import { ICard, IPlayer } from '../../interfaces'

export const Game = () => {
  const [gameState, setGameState] = React.useState<GAME_STATE>(GAME_STATE.IDLE)
  const [deckId, setDeckId] = React.useState<string>('')
  const [player, setPlayer] = React.useState<IPlayer>()
  const [dealer, setDealer] = React.useState<IPlayer>()

  React.useEffect(() => {
    if (gameState === GAME_STATE.DEALER_TURN) {
      playDealer()
    }
  }, [gameState])

  const start = async () => {
    const { id: deckId } = await service.createDeck()
    setDeckId(deckId)

    const { cards: playerCards } = await service.drawCards(deckId, 2)
    setPlayer({
      name: 'Player',
      cards: playerCards,
      score: calculateScore(playerCards)
    })

    const { cards: dealerCards } = await service.drawCards(deckId, 2)
    setDealer({
      name: 'Dealer',
      cards: dealerCards,
      score: calculateScore(dealerCards)
    })

    setGameState(GAME_STATE.PLAYER_TURN)
  }

  const draw = async () => {
    const { cards: newCards } = await service.drawCards(deckId)
    const newHand = [...player!.cards, ...newCards]
    const newScore = calculateScore(newHand)
    const maxExceeded = newScore > MAX_SCORE

    setPlayer({
      ...player,
      cards: newHand,
      score: newScore,
      maxExceeded
    } as IPlayer)

    if (maxExceeded) {
      stay()
    }
  }

  const stay = async () => {
    setGameState(GAME_STATE.DEALER_TURN)
  }

  const calculateScore = (cards: ICard[]): number => {
    let score = cards.reduce((total, card) => total + CARD_VALUES[card.value], 0)

    if (score > MAX_SCORE) {
      const hasAces = cards.some(card => card.value === 'ACE')

      if (hasAces) {
        score = cards.reduce((total, card) => total + CARD_VALUES[card.value === 'ACE' ? 'ACE1' : card.value], 0)
      }
    }

    return score
  }

  const playDealer = async () => {
    let localDealer = { ...dealer! }
    while (calculateWinProbability(localDealer) === 1) {
      const { cards: newCards } = await service.drawCards(deckId)
      const newHand = [...localDealer.cards, ...newCards]
      const newScore = calculateScore(newHand)

      localDealer = {
        ...dealer!,
        cards: newHand,
        score: newScore
      } as IPlayer
    }

    setDealer(localDealer)
    setGameState(GAME_STATE.FINISHED)
  }

  const calculateWinProbability = (dealer: IPlayer): number => {
    if (player!.score > MAX_SCORE) {
      return 0;
    }

    if (dealer!.score > player!.score) {
      return 0;
    }

    if (dealer!.score < MIN_FINISH_VALUE) {
      return 1;
    }

    if (player!.score >= MIN_FINISH_VALUE) {
      return 1;
    } else {
      return 0;
    }
  }


  return (
    <main className='game'>
      {gameState !== GAME_STATE.IDLE && (
        <div className='game__table'>
          <Player {...dealer!} />
          <Player {...player!} />
        </div>
      )}
      <Buttons gameState={gameState} onStartClick={start} onDrawClick={draw} onStayClick={stay} />
    </main>
  )
}