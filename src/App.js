import { useState } from 'react'
import './styles/layout.css'
import './styles/card.css'
import cardData from './data/cardData'
import Scoreboard from './components/Scoreboard/Scoreboard'

const App = () => {

  // Fisher-Yates shuffle
  const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const [cards, setCards] = useState(cardData)
  const [selections, setSelections] = useState(shuffle([...cards]).slice(0,3))
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0)
  const [message, setMessage] = useState("")

  const cardClickHandler = id => {
    const clickedCard = cards.find(card => card.id === id)
    if (clickedCard.isClicked) {
      // End Game
      setMessage("Oops, Game Over! Try again...")
      // Evaluate Score
      if (score > highScore) {
        setHighScore(score)
      }

      // Reset score
      setScore(0)

      // Reset Cards
      setCards([
        ...cards.map(card => {
          card.isClicked = false
          return card
        }),
      ])
      // Reset Options
      setSelections(
        shuffle([...cards].filter(card => !selections.includes(card))).slice(0, 3)
      )
    } else {
      // Continue
      setMessage("Correct! Select again...")
      setSelections(null)
      // Increase Score
      setScore(score + 1)
      setCards([
        ...cards.map(card => {
          if (card.id === id) {
            card.isClicked = true
          }
          return card
        }),
      ])
      // Get unclicked cards
      const unclickedCards = [...cards.filter(card => card.isClicked === false)]

      // End if there is no unclicked cards
      if (unclickedCards.length === 0) {
        // End
        // Evaluate Score
        setHighScore(cards.length)
        // Reset Score
        setScore(0)
        // Reset Cards
        setCards([
          ...cards.map(card => {
            card.isClicked = false
            return card
          }),
        ])
        // Reset Selections
        setSelections(shuffle([...cards]).slice(0, 3))
      } else {
        // Change Selections
        const validCard = shuffle(
          unclickedCards.filter(card => !selections.includes(card))
        )[0]
        const newSelections = [
          validCard,
          ...shuffle(
            cards.filter(
              card => card.id !== validCard.id && !selections.includes(card)
            )
          ).slice(0, 2),
        ]
        setSelections(shuffle([...newSelections]))
      }

    }
  }

  return (
    <div className="App">
      <div className="Scoreboard">
        <h2>NASDAQ Memory Game</h2>
        <Scoreboard
          score={score}
          highScore={highScore}
          maxScore={cardData.length}
        />
      </div>
      <div className="Message">
        <h3>Select a company...</h3>
      </div>
      <div className="Main">
        {selections &&
          selections.map(card => (
            <div className="card"
              onClick={() => cardClickHandler(card.id)}
              key={card.id}
            >
              <div className="ticker">{card.ticker}</div>
              <img src={card.img} alt="Logo" />
              <div className="name">
                <p>{card.name}</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className="Response">
        {message}
      </div>
    </div>
  );
}

export default App;
