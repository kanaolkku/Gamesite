import React, { useEffect, useState } from "react";
import Card from "./Card";
import("./voitonvarma.css");

const Voitonvarma = () => {
  const [deck, setDeck] = useState({})
  const [sips, setSips] = useState(0);
  const [cardsLeft, setCardsLeft] = useState(52);
  const [currentCard, setCurrentCard] = useState({value: null, image: "koira"});
  const [previousCard, setPreviousCard] = useState({value: null, image: "koira"});

  const drawCard = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
      .then(data => data.json())
      .then(data  => {
        setPreviousCard(currentCard);
        setCurrentCard({
          value: checkIfCourt(data.cards[0].value),
          image: data.cards[0].image
        });
        setCardsLeft(data.remaining)
      })
      .catch(err => console.error(err));
  };

  const checkIfCourt = (value) => {
    switch (value) {
      case "JACK":
        return 11;
      case "QUEEN":
        return 12;
      case "KING":
        return 13;
      case "ACE":
        return 1;
      default:
        return value;
    }
  }

useEffect(() => {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(data => data.json())
  .then(data => {
    setDeck(data);
    console.log(data);
  })
  .catch(err => console.log(err.message))
  
}, [])

  return (
    <div className="voiton-varma">
      <h1>Voiton varma</h1>
      <div className="game-container">
        <Card number={currentCard.value}/>
        <div>previous card:{previousCard.value}</div>
        <button onClick={drawCard}>Draw card</button>
      </div>
    </div>
  );
};

export default Voitonvarma;
