//React Effects & Refs Exercise Part 1
// display a deck of cards, one card at a time
// when page loads , create new deck and show button on page 
// click button, display new card
// alert message when no more card 

import React, {useState, useEffect} from "react";
import axios from 'axios';

const CardDeck = () => {
  const baseURL = 'https://deckofcardsapi.com/api/deck';

  const [deckId, setDeckId] = useState(null);
  const [card, setCard] = useState(null);
 
  useEffect(() => {
    async function getDeck(){
      const res = await axios.get(`${baseURL}/new/shuffle/`);
      setDeckId(res.data.deck_id);
      
    }
    getDeck()
  }, [])

  const handleClick = () => {
    async function drawCard(){
      const res = await axios.get(`${baseURL}/${deckId}/draw`);
      setCard(res.data.cards[0].image);
    
      if (res.data.remaining === 0) {
        alert('Error: no cards remaining!')
      }
    }
    drawCard()
  }

  


  return (
    <>
    <button onClick={handleClick}>Gimme a card!</button>
    {card ? <img src={card} /> : <h1> Loading ...</h1>}
    </>
  )
}

export default CardDeck;

