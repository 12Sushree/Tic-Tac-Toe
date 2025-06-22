import { useState } from "react";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const cellBorders = [
    "border-r-4 border-r-white border-b-4 border-b-white",
    "border-r-4 border-r-white border-b-4 border-b-white",
    "border-b-4 border-b-white",
    "border-r-4 border-r-white border-b-4 border-b-white",
    "border-r-4 border-r-white border-b-4 border-b-white",
    "border-b-4 border-b-white",
    "border-r-4 border-r-white",
    "border-r-4 border-r-white",
    "",
  ];

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : squares.includes(null)
    ? `Next Player: ${isXNext ? "X" : "O"}`
    : "Draw!";

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">{status}</h1>
      <div className="grid grid-cols-3 w-[300px] h-[300px] bg-white/70 mx-auto shadow-lg p-3">
        {cellBorders.map((borderClass, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`${borderClass} flex items-center justify-center text-3xl font-bold ${
              squares[index] === "X" ? "text-blue-900" : "text-red-600"
            }`}
          >
            {squares[index]}
          </div>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Reset Game
      </button>
    </div>
  );
};

// Winner check logic
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
