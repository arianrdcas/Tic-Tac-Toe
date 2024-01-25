import { useState } from "react";
import { Fragment } from "react";
import "./App.css";

const Turns = {
  X: "X",
  O: "O",
};

const Cuadricula = ({ children, isSelected, actualizarCuadricula, index }) => {
  const className = `cuadricula ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    actualizarCuadricula(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const comboGanador = [
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
  const [jugadores, setJugadores] = useState({ jugador1: "", jugador2: "" });
  const [nombresGuardados, setNombresGuardados] = useState(false);
  const [turn, setTurn] = useState(Turns.X);

  const guardarNombres = (e) => {
    e.preventDefault();
    setNombresGuardados(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJugadores((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [board, setBoard] = useState(Array(9).fill(null));
  const [ganador, setGanador] = useState(null);

  const revisarGanador = (cuadriculaCheck) => {
    for (const combo of comboGanador) {
      const [a, b, c] = combo;
      if (
        cuadriculaCheck[a] &&
        cuadriculaCheck[a] === cuadriculaCheck[b] &&
        cuadriculaCheck[a] === cuadriculaCheck[c]
      ) {
        return cuadriculaCheck[a];
      }
    }
    return null;
  };

  const reiniciarJuego = () => {
    setBoard(Array(9).fill(null));
    setTurn(Turns.X);
    setGanador(null);
  };

  const checkEndGame = (nuevoBoard) => {
    return nuevoBoard.every((cuadricula) => cuadricula !== null);
  };

  const actualizarCuadricula = (index) => {
    if (board[index] || ganador) return;
    const nuevoBoard = [...board];
    nuevoBoard[index] = turn;
    setBoard(nuevoBoard);
    const nuevoTurno = turn === Turns.X ? Turns.O : Turns.X;
    setTurn(nuevoTurno);
    const nuevoGanador = revisarGanador(nuevoBoard);
    if (nuevoGanador) {
      setGanador(nuevoGanador);
    } else if (checkEndGame(nuevoBoard)) {
      setGanador(false);
    }
  };

  return (
    <Fragment>
      <div className="ventana">
        <h1 className="nombre-juego">Tic Tac Toe</h1>
        {/* <div className="jugadores">     
          {nombresGuardados ? (
            <div>
              <h2>Jugador 1 </h2>
              <h3 className="jugador1">{jugadores.jugador1}</h3>
              <h2>Jugador 2 </h2>
              <h3>{jugadores.jugador2}</h3>
            </div>
          ) : (
            <form onSubmit={guardarNombres}>
              <p>Jugador 1:</p>
              <input
                type="text"
                name="jugador1"
                value={jugadores.jugador1}
                onChange={handleInputChange}
              />
              <p style={{ marginTop: "10px" }}>Jugador 2:</p>
              <input
                type="text"
                name="jugador2"
                value={jugadores.jugador2}
                onChange={handleInputChange}
              />
              <button className="boton-guardar" type="submit">
                Guardar nombres
              </button>
            </form>
          )}
        </div> */}
        <section>
          <Cuadricula isSelected={turn === Turns.X}>{Turns.X}</Cuadricula>
          <Cuadricula isSelected={turn === Turns.O}>{Turns.O}</Cuadricula>
        </section>
        <div className="square">
          {board.map((_, index) => {
            return (
              <Cuadricula
                key={index}
                index={index}
                actualizarCuadricula={actualizarCuadricula}
              >
                {board[index]}
              </Cuadricula>
            );
          })}
        </div>
        <section>
          {ganador !== null && (
            <h2>{ganador === false ? "Empate" : "Gano " + ganador}</h2>
          )}
        </section>
        <footer>
          <button onClick={reiniciarJuego}>Reiniciar juego</button>
        </footer>
      </div>
    </Fragment>
  );
}

export default App;
