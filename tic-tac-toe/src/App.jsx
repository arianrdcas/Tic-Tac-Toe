import { useState } from "react";
import { Fragment } from "react";
import "./App.css";

function App() {
  /* const [jugador1, setJugador1] = useState("");
  const [jugador2, setJugador2] = useState(""); */

  const [jugadores, setJugadores] = useState({ jugador1: "", jugador2: "" });
  const [nombresGuardados, setNombresGuardados] = useState(false);

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
          {nombresGuardados ? (
            <div>
              <h1>{jugadores.jugador1}</h1>
              <h1>{jugadores.jugador2}</h1>
            </div>
          ) : (
            <form onSubmit={guardarNombres}>
              <p>Jugador 1:</p>
              <input
                type="text"
                placeholder="Nombre jugador 1"
                name="jugador1"
                value={jugadores.jugador1}
                onChange={handleInputChange}
              />
              <p style={{ marginTop: "10px" }}>Jugador 2:</p>
              <input
                type="text"
                placeholder="Nombre jugador 2"
                name="jugador2"
                value={jugadores.jugador2}
                onChange={handleInputChange}
              />
              <button className="boton-guardar" type="submit">
                Guardar nombres
              </button>
            </form>
          )}
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
