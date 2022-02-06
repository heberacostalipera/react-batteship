import React, { useState } from "react";

// Material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Context
import { useFlotas } from "../../context/FlotasProvider";

// Utils
import { orientations } from "../../utils/utils";

// Components
import ShipList from "../ShipList";
import Tabla from "../Tabla/Tabla";

const SetUpGame = ({ onClick }) => {
  const { allyMap, myShips, placeShip } = useFlotas();
  const [orientation, setOrientation] = useState(orientations.VERTICAL);
  const [selectedShip, setSelectedShip] = useState(0);
  const [placedShips, setPlacedShips] = useState([]);

  const selectShip = (index) => {
    setSelectedShip(index);
  };

  const handleSetOrientation = (newOrientation) => () => {
    setOrientation(newOrientation);
  };

  const handlePlacement = (row, col) => {
    if (placedShips.indexOf(selectedShip) === -1) {
      setPlacedShips([...placedShips, selectedShip]);
    }
    placeShip(row, col, orientation, selectedShip);
  };

  const disabledIndex = allyMap.length - myShips[selectedShip].size;
  const disabledRows = orientation === orientations.VERTICAL && disabledIndex;
  const disabledCols = orientation === orientations.HORIZONTAL && disabledIndex;
  const disabledContinue = placedShips.length !== myShips.length;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 4 }}>
            <Box sx={{ width: "100%", mb: 4 }}>
              <Typography variant="h5" sx={{ width: "100%", mb: 2 }}>
                SELECT SHIP
              </Typography>
              <Divider />
            </Box>
            <ShipList
              onClick={selectShip}
              selected={selectedShip}
              ships={myShips}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ width: "100%", mb: 4 }}>
              <Typography variant="h5" sx={{ width: "100%", mb: 2 }}>
                SELECT ORIENTATION
              </Typography>
              <Divider />
            </Box>
            <Button
              onClick={handleSetOrientation(orientations.VERTICAL)}
              sx={{ mx: 4, mb: 2, minWidth: "auto" }}
              variant={
                orientation === orientations.VERTICAL ? "contained" : "outlined"
              }
            >
              Vertical
            </Button>
            <Button
              onClick={handleSetOrientation(orientations.HORIZONTAL)}
              sx={{ mx: 4, mb: 2, minWidth: "auto" }}
              variant={
                orientation === orientations.HORIZONTAL
                  ? "contained"
                  : "outlined"
              }
            >
              Horizontal
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 4 }}>
            <Box sx={{ width: "100%", mb: 4 }}>
              <Typography variant="h5" sx={{ width: "100%", mb: 2 }}>
                PLACE SHIP
              </Typography>
              <Divider />
            </Box>
            <Tabla
              disabledCols={disabledCols}
              disabledRows={disabledRows}
              displayShips
              map={allyMap}
              onClick={handlePlacement}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {disabledContinue && (
            <Typography variant="body1" color="primary" sx={{ width: "100%" }}>
              Please, place all ships before starting the game.
            </Typography>
          )}
          <Button
            disabled={disabledContinue}
            onClick={onClick}
            size="large"
            sx={{ mx: "auto", my: 4, display: "flex" }}
            variant="contained"
          >
            START
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SetUpGame;
