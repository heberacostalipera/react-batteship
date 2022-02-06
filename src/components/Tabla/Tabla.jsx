import React from "react";

// Material
import Container from "@mui/material//Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material//Typography";

// Utils
import { getAlphabetArray } from "../../utils/utils";

// Components
import RowTabla from "./RowTabla";

const emptyArray = Array.from(Array(10));
const alphabet = getAlphabetArray();

const rowNumeros = emptyArray.map((_, i) => (
  <Grid key={i} item xs={1}>
    <Typography component="span">{i + 1}</Typography>
  </Grid>
));

const Tabla = ({
  color,
  disabledCols,
  disabledRows,
  displayShips,
  map,
  onClick,
}) => {
  const handleClick = (row) => (col) => () => {
    if (onClick) onClick(row, col);
  };

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid container item xs={12} spacing={0}>
          <Grid item xs={2}>
            <span></span>
          </Grid>
          {rowNumeros}
        </Grid>
        {map.map((row, i) => (
          <Grid container item xs={12} key={i} spacing={0}>
            <Grid item xs={2}>
              <Typography component="span">{alphabet[i]}</Typography>
            </Grid>
            <RowTabla
              color={color}
              disabled={disabledRows && i > disabledRows}
              disabledCols={disabledCols}
              displayShips={displayShips}
              onClick={handleClick(i)}
              row={row}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Tabla;
