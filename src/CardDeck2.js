//React Effects & Refs Exercise Part 2
// click button, page to draw one card every second
// draws to continue until button is pressed again or when deck has been exhausted

import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';

const baseURL = 'https://deckofcardsapi.com/api/deck';

const CardDeck2 = () => {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerId = useRef();
 
  /* load deck from API into state */
  useEffect(() => {
    async function getDeck(){
      const res = await axios.get(`${baseURL}/new/shuffle/`);
      setDeck(res.data);
    }
    getDeck()
  }, [])

  /* draw one card every second if autoDraw is true */
  useEffect(() => {
    async function drawCard(){
      try {
        const {deck_id} = deck;
        const res = await axios.get(`${baseURL}/${deck_id}/draw`);

        if (res.data.remaining === 0) {
          setAutoDraw(false);
          throw new Error('no cards remaining!');
        }
  
        setCard(res.data.cards[0].image);
       
      } catch(e) {
        alert(e)
      } 
    }

    if(autoDraw && !timerId.current){
      timerId.current = setInterval(() => {
        drawCard()
      }, 1000)
    }
    console.log(timerId.current)
    
    return () => {
      clearInterval(timerId.current);
      timerId.current = null;
    }

  }, [autoDraw, setAutoDraw, deck]);
  
  const toggleDraw = () => {
    setAutoDraw(autoDraw => !autoDraw);
  };

  return (
    <>
      {deck ? (
        <button onClick={toggleDraw}>
         {autoDraw ? 'STOP' : 'KEEP'} DRAWING
        </button>
      ) 
        : null}
      
      <img src={card} />
    </>
  )
}

export default CardDeck2;

// when is the return statement ran
// how why both autoDraw and setAutoDraw in dependency array