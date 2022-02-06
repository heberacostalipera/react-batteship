import React from "react";

// Material
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const ShipList = ({ ships, onClick, selected }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {ships.map((ship, index) => (
        <Grid item xs={2} key={ship.id}>
          <Button
            onClick={() => onClick(index)}
            variant={selected === index ? "contained" : "outlined"}
            sx={{ minWidth: "auto" }}
          >
            {ship.size}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(ShipList);
