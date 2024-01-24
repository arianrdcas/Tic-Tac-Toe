import { useState } from "react";
import { Fragment } from "react";
import "./App.css";

const Turns = {
  X: "X",
  O: "O",
};



const Cuadricula = ({ children, updateCuadricula, index }) => {
  return <div className="cuadricula">{children}</div>;
};



function App() {

  const [jugadores, setJugadores] = useState({ jugador1: "", jugador2: "" });
  const [nombresGuardados, setNombresGuardados] = useState(false);
  const [turn, setTurn] = useState(Turns.X)


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
  

  return (
    <Fragment>
      <div className="ventana">
        <div className="jugadores">
          <h1 className="nombre-juego">Tic Tac Toe</h1>
          {nombresGuardados ? (
            <div>
              <h2>Jugador 1 :</h2>
              <h3 className="jugador1">{jugadores.jugador1}</h3>
              <h2>Jugador 2 :</h2>
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
        </div>
        <div className="square">
          {board.map((_, index) => {
            return <Cuadricula key={index}>{board[index]}</Cuadricula>;
          })}
        </div>
        <section id="turno-jugador">
          <Cuadricula isSelected={turn === Turns.X}>{Turns.X}</Cuadricula>
          <Cuadricula>{Turns.O}</Cuadricula>
        </section>
      </div>
    </Fragment>
  );
}

export default App;
