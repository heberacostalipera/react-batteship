import React, { useState } from "react";

// Material
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

// Context
import { useFlotas } from "../context/FlotasProvider";

// Utils
import { players } from "../utils/utils";

// Componets
import SetUpGame from "./SetUpGame/SetUpGame";
import Tablero from "./Tablero/Tablero";

const winnerTexts = {
  [players.PLAYER]: "YOU WON!",
  [players.PC]: "YOU LOSE!",
};

const Game = () => {
  const [ready, setReady] = useState(false);
  const { winner, resetGame } = useFlotas();

  const handleCLick = () => setReady(true);

  const handleReset = () => {
    setReady(false);
    resetGame();
  };

  return (
    <main>
      {ready ? <Tablero /> : <SetUpGame onClick={handleCLick} />}
      <Dialog open={Boolean(winner)}>
        <Typography variant="h2" sx={{ textAlign: "center", p: 4 }}>
          {winnerTexts[winner]}
        </Typography>
        <DialogActions sx={{ justifyContent: "center", p: 4 }}>
          <Button size="large" variant="contained" onClick={handleReset}>
            PLAY AGAIN
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default Game;
