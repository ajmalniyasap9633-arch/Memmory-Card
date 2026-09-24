

export function GameHeader({ score, moves, Reset,setDark,isdark,isGameComplete}) {

  
   
  return (
    <div className="game-header">
      <h1>Memory Card Game</h1>

      {isGameComplete? (
        <div className="game-complete">
          <h2>Congratulations!</h2>

          <button onClick={Reset} className="restart-button">
            Restart
          </button>
        </div>
      ) : (
        <>
          <div className="stats">
            <div className="stat-item">
              <span className="stat_label">Score:</span>
              <span className="stat_value">{score}</span>
            </div>

            <div className="stat-item">
              <span className="stat_label">Moves:</span>
              <span className="stat_value">{moves}</span>
            </div>
          </div>

          <button onClick={Reset} className="restart-button">
            Restart
          </button>
           <button
        className="theme-button" onClick={() => setDark(prev => !prev)}>
        {isdark ? "☀️ Light" : "🌙 Dark"}
      </button>
        </>
      )}
    </div>
  );
}