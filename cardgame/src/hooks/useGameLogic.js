
import { useState, useEffect, useRef } from "react"
export function useGameLogic(cardValues) {
    const [cards, setCards] = useState([])
    const [score, setScore] = useState(0)
    const [moves, setMoves] = useState(0)
    const [flippedCards, setFlippedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [locked, setLocked] = useState(false)

    const clickSound = useRef(
        new Audio("/whoop.mp3")
    );

    const startSound = useRef(
        new Audio("/win.mp3")
    );

    const wrongSound = useRef(
        new Audio("/fail.mp3")
    );
    const win = useRef(
        new Audio("/win.mp3")
    )
    function playsound(sound) {
        sound.current.currentTime = 0
        sound.current.play();
    }
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
        if (card.isFlipped || card.isMatched || locked || flippedCards.length === 2) {
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
        playsound(clickSound);
        const newflippedCards = [...flippedCards, card.id];
        setFlippedCards(newflippedCards)
        if (flippedCards.length === 1) {
            setLocked(true)
            const firstCard = cards[flippedCards[0]]
            if (firstCard.value === card.value) {
                setMatchedCards((prev) => [...prev, firstCard.id, card.id])

                setCards((prev) => prev.map((c) => {
                    if (c.id === card.id || c.id === firstCard.id) {
                        return { ...c, isMatched: true }
                    } else {
                        return c;
                    }

                }))
                playsound(win)
                setScore((prev) => prev + 1)
                setFlippedCards([])
                setLocked(true)

            } else {
                setTimeout(() => {
                    const flippedBack = newCards.map((c) => {
                        if (newflippedCards.includes(c.id) || c.id === card.id) {
                            return { ...c, isFlipped: false }
                        } else {
                            return c;

                        }
                    });
                    playsound(wrongSound)
                    setCards(flippedBack)
                    setFlippedCards([])
                }, 1000);

            }
            setMoves((prev) => prev + 1)
            setLocked(false)
        }

    }
    const isGameComplete = matchedCards.length === cardValues.length
    return { cards, score, moves, cardClicked, initialGame, isGameComplete }
}