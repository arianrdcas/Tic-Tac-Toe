import { useState } from "react";
import { Fragment } from "react";
import "./App.css";

const Turns = {
  X: "X",
  O: "O",
};

const Cuadricula = ({ children, updateCuadricula, index,}) => {
  const className = "cuadricula";

  const handleClick = () => {
    updateCuadricula(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const CuadriculaTurn = ({ children,isSelected }) => {
  const className = `cuadriculaturn ${isSelected ? "is-selected" : "no-selected"}`;
  return <div className={className}>{children}</div>;
};


const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {

  const [turn, setTurn] = useState(Turns.X);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const checkWinner = (gridCheck) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        gridCheck[a] &&
        gridCheck[a] === gridCheck[b] &&
        gridCheck[a] === gridCheck[c]
      ) {
        return gridCheck[a];
      }
    }
    return null;
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(Turns.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((cuadricula) => cuadricula !== null);
  };

  const updateCuadricula = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === Turns.X ? Turns.O : Turns.X;
    setTurn(newTurn);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <Fragment>
      <div className="ventana">
        <div className="seccion-nombre-ganador">
          <h1 className="nombre-juego">Tic Tac Toe</h1>
          <section className="winner">
            {winner !== null && (
              <h2>{winner === false ? "Empate" : "Ganó: " + winner}</h2>
            )}
          </section>
        </div>
        <div className="square">
          {board.map((_, index) => {
            return (
              <Cuadricula
                key={index}
                index={index}
                updateCuadricula={updateCuadricula}
              >
                {board[index]}
              </Cuadricula>
            );
          })}
        </div>
        <footer>
          <button className="restart-game" onClick={restartGame}>
            Reiniciar juego
          </button>
          <section className="turno">
            <CuadriculaTurn isSelected={turn === Turns.X}>
              {Turns.X}
            </CuadriculaTurn>
            <CuadriculaTurn isSelected={turn === Turns.O}>
              {Turns.O}
            </CuadriculaTurn>
          </section>
        </footer>
      </div>
    </Fragment>
  );
}

export default App;
