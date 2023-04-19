const CardValues = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 11,
};

const CardSuits = {
  diamonds: 1,
  hearts: 2,
  spades: 3,
  clubs: 4,
};

function generateDeck() {
  const deck = [];
  try {
    for (const suit in CardSuits) {
      for (const value in CardValues) {
        deck.push({
          suit: suit,
          value: value,
          score: CardValues[value],
          suitScore: CardSuits[suit],
        });
      }
    }
  } catch (error) {
    console.error(`Error generating deck: ${error.message}`);
  }
  return deck;
}

function shuffleDeck(deck) {
  try {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  } catch (error) {
    console.error(`Error shuffling deck: ${error.message}`);
  }
  return deck;
}

function dealCards(deck) {
  const hands = [];
  try {
    for (let i = 0; i < 6; i++) {
      hands.push(deck.splice(0, 5));
    }
  } catch (error) {
    console.error(`Error dealing cards: ${error.message}`);
  }
  return hands;
}

function calculateScore(hand) {
  let score = 0;
  let suitScore = 1;
  try {
    for (const card of hand) {
      score += card.score;
      suitScore *= card.suitScore;
    }
  } catch (error) {
    console.error(`Error calculating score: ${error.message}`);
  }
  return { score, suitScore };
}

function calculateWinner(hands) {
  let winners = [];
  let winningScore = 0;
  try {
    for (let i = 0; i < hands.length; i++) {
      const { score, suitScore } = calculateScore(hands[i]);
      if (score > winningScore) {
        winners = [i];
        winningScore = score;
      } else if (score === winningScore) {
        if (suitScore > calculateScore(hands[winners[0]]).suitScore) {
          winners = [i];
        } else if (suitScore === calculateScore(hands[winners[0]]).suitScore) {
          winners.push(i);
        }
      }
    }
  } catch (error) {
    console.error(`Error calculating winner: ${error.message}`);
  }
  return { winners, winningScore };
}

try {
  const deck = shuffleDeck(generateDeck());
  const hands = dealCards(deck);
  const { winners, winningScore } = calculateWinner(hands);

  console.log("Hands:");
  for (let i = 0; i < hands.length; i++) {
    console.log(`Player ${i + 1}: ${JSON.stringify(hands[i])}`);
  }

  console.log(`Winning score: ${winningScore}`);
  console.log(
    `Winners: ${winners.map((winner) => `Player ${winner + 1}`).join(", ")}`
  );
} catch (error) {
  console.error(`Error, ${error}`);
}

module.exports = {
  generateDeck,
  shuffleDeck,
  dealCards,
  calculateScore,
  calculateWinner,
};
