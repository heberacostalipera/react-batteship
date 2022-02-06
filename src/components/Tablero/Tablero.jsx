import React from "react";

// Material
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// Components
import VistaInferior from "./VistaInferior";
import VistaLateral from "./VistaLateral";
import VistaSuperior from "./VistaSuperior";

const Tablero = () => {
  return (
    <Container sx={{ py: 4, px: 2 }}>
      <Grid container spacing={2}>
        <Grid container spacing={2} item xs={12} md={9} lg={8}>
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
              <VistaSuperior />
            </Paper>
          </Grid>
          <Grid item xs={12} sx={{ display: { xs: "block", md: "none" } }}>
            <Paper sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
              <VistaLateral />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
              <VistaInferior />
            </Paper>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          lg={4}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <VistaLateral />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tablero;
