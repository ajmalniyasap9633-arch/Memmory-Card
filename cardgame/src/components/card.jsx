export function Card({ card,onCardClick }) {
  return (
    <div className={`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`} onClick={() => onCardClick(card)}>
        <div className="card-front">?</div>
        <div className="card-back">{card.value}</div>
     
    </div>
  );
}