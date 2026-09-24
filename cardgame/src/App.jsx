import { useState } from "react";
import {useGameLogic} from "./hooks/useGameLogic"
import { Card } from "./components/card";
import { GameHeader } from "./components/gameheader";

function App() {
    const [isdark, setDark] = useState(false)
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
   const {cards,score,moves,initialGame,cardClicked,isGameComplete}=useGameLogic(cardValues)
 
  return (
    <div className={isdark ? "app dark" : "app"}>
      <GameHeader score={score} moves={moves} Reset={initialGame} isdark={isdark} setDark={setDark} isGameComplete={isGameComplete} />
      <div className="card-grid">
        {cards.map((card, index) => (
          <Card key={index} card={card} onCardClick={cardClicked} />
        ))}
      </div>
    </div>
  )
}

export default App
