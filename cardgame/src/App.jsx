import { useEffect, useState } from "react";
import { Card } from "./components/card";
import { GameHeader } from "./components/gameheader";
function App() {
  const [cards, setCards] = useState([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards,setMatchedCards]=useState([])
  const [locked,setLocked]=useState(false)
   const[isdark,setDark]=useState(false)
const cardValues = [
  "😀", "😀",
  "😍", "😍",
  "😎", "😎",
  "🤩", "🤩",
  "😘", "😘",
  "🥳", "🥳",
  "🤔", "🤔",
  "😴", "😴"
];
function shuffle(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

  function initialGame() {
    const shuffledCard = shuffle(cardValues)
    const finalCards = shuffledCard.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false
    }))
   
    setCards(finalCards)
     setScore(0)
    setMoves(0)
    setLocked(false)
    setMatchedCards([])
    setFlippedCards([])
  }

  useEffect(() => {
    initialGame();
  }, [])
  
  function cardClicked(card) {
    //dont allow clicking if already matched or flipped
    if (card.isFlipped || card.isMatched || locked || flippedCards.length===2) {
      return;
    }

    //update card if flipped
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true }
      } else {
        return c;
      }
    })
    setCards(newCards)
    const newflippedCards = [...flippedCards, card.id];
    setFlippedCards(newflippedCards)
    if (flippedCards.length === 1) {
      setLocked(true)
      const firstCard = cards[flippedCards[0]]
      if (firstCard.value === card.value) {
        setMatchedCards((prev)=>[...prev,firstCard.id,card.id])
    //      const newMatchedCards = cards.map((c) => {
    //   if (c.id === card.id || c.id === firstCard.id) {
    //     return { ...c, isMatched: true,isFlipped:true }
    //   } else {
    //     return c;
    //   }
   
    // })
     setCards((prev)=>prev.map((c) => {
      if (c.id === card.id || c.id === firstCard.id) {
        
        return { ...c, isMatched: true }
      } else {
        return c;
      }
   
    }))
    setScore((prev)=>prev+1)
      setFlippedCards([])
      setLocked(true)

      }else{
        setTimeout(() => {
             const flippedBack = newCards.map((c)=>{
          if(newflippedCards.includes(c.id)||c.id === card.id){
           return {...c,isFlipped:false}
          }else{
           return c;
          
          } 
        });
        setCards(flippedBack)
        setFlippedCards([])
        }, 1000);
     
      }
      setMoves((prev)=>prev+1)
      setLocked(false)
    }

    }
    return (
      <div className={isdark ? "app dark" : "app"}>
        <GameHeader score={score} moves={moves} Reset={initialGame} isdark={isdark} setDark={setDark} />
        <div className="card-grid">
          {cards.map((card, index) => (
            <Card key={index} card={card} onCardClick={cardClicked} />
          ))}
        </div>
      </div>
    )
}

export default App
