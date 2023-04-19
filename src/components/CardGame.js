import React, { useState } from "react";
import {
  generateDeck,
  shuffleDeck,
  dealCards,
  calculateScore,
  calculateWinner,
} from "./back";

const CardGame = () => {
  const [winners, setWinners] = useState([]);
  const [winningScore, setWinningScore] = useState(0);
  const [hands, setHands] = useState([]);

  const handlePlayGame = () => {
    const deck = shuffleDeck(generateDeck());
    const hands = dealCards(deck);
    const { winners, winningScore } = calculateWinner(hands);

    setHands(hands);
    setWinners(winners);
    setWinningScore(winningScore);
  };

  return (
    <div>
      <h1>Multiplayer Card Game</h1>
      <button onClick={handlePlayGame}>Play Game</button>
      {winningScore > 0 && (
        <div>
          <h2>Winners:</h2>
          {winners.map((winner) => (
            <div key={winner}>Player {winner + 1}</div>
          ))}
          <h2>Winning Score: {winningScore}</h2>
          <h2>Hands:</h2>
          <div className="hands">
            {hands.map((hand, index) => (
              <div key={index} className="hand">
                <h3>Player {index + 1}:</h3>
                <ul>
                  {hand.map((card, index) => (
                    <li key={index}>
                      {card.value} of {card.suit}
                    </li>
                  ))}
                </ul>
                <h4>Score: {calculateScore(hand).score}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGame;
