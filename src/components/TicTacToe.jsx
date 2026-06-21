import { useEffect, useState } from "react";

const TicTacToe = () => {
  const GRID_SIZE = 3;
  const [isXTurn, setIsXTurn] = useState(true);
  const [arr, setArr] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const handleCellClick = (id) => {
    if (arr[id] || winner) return;
    const val = isXTurn ? "X" : "O";
    const newArr = [...arr];
    newArr[id] = val;
    setArr(newArr);
    setIsXTurn(!isXTurn);
  };

  const checkWinner = () => {
    const winnerIndex = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of winnerIndex) {
      if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
        setWinner(arr[a]);
        return;
      }
    }
    if (arr.every((cell) => cell !== "")) {
      setIsDraw(true);
    }
  };

  const handleReset = () => {
    const newArr = Array(9).fill("");
    setArr(newArr);
    setWinner(null);
    setIsDraw(false);
  };

  useEffect(() => {
    checkWinner();
  }, [arr]);

  return (
    <>
      {Array.from({ length: GRID_SIZE }, (_, rowID) => (
        <div
          key={rowID}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {Array.from({ length: GRID_SIZE }, (_, colId) => {
            const index = rowID * GRID_SIZE + colId;
            return (
              <div
                key={colId}
                style={{
                  border: "1px solid gray",
                  width: "100px",
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => handleCellClick(index)}
              >
                {arr[index]}
              </div>
            );
          })}
        </div>
      ))}
      <div>{winner ? `${winner} is Winner` : null}</div>
      <div>
        {isDraw ? "Match Draw, Click Reset Button to Play Again" : null}
      </div>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};

export default TicTacToe;
