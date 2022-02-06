import React, { useState } from "react";

// Context
import FlotasProvider from "../context/FlotasProvider";

// Componets
import SetUpGame from "./SetUpGame/SetUpGame";
import Tablero from "./Tablero/Tablero";

const Game = () => {
  const [ready, setReady] = useState(false);

  const handleCLick = () => {
    setReady(true);
  };

  return (
    <main>
      <FlotasProvider>
        {ready ? <Tablero /> : <SetUpGame onClick={handleCLick} />}
      </FlotasProvider>
    </main>
  );
};

export default Game;
