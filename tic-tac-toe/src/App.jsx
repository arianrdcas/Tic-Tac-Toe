import { useState } from "react";
import { Fragment } from "react";
import "./App.css";

function App() {

const[jugador1, setJugador1] = useState('')
const [jugador2, setJugador2] = useState("");

  const Turn = {
    X: "x",
    O: "o",
  };

  const board = Array(9).fill(null);

  const Cuadricula = ({ children, updateCuadricula, index }) => {
    return <div className="cuadricula">{children}</div>;
  };

  return (
    <Fragment>
      <div className="ventana">
        <div className="jugadores">
          <h1 className="nombre-juego">Tic Tac Toe</h1>
          <div>
            <p>Jugador 1:</p>
            <input
              type="text"
              placeholder="Nombre jugador 1"
              name="jugador1"
              value={jugador1}
              onChange={(e) => setJugador1(e.target.value)}
            />
          </div>
          <div>
            <p>Jugador 2:</p>
            <input
              type="text"
              placeholder="Nombre jugador 2"
              name="jugador2"
              value={jugador2}
              onChange={(e) => setJugador2(e.target.value)}
            />
          </div>
        </div>
        <div className="square">
          {board.map((_, index) => {
            return <Cuadricula key={index}>{index}</Cuadricula>;
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
