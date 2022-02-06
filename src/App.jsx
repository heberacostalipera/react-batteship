import React from "react";

// Material
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

// Context
import FlotasProvider from "./context/FlotasProvider";

// Components
import Game from "./components/Game";

const darkTheme = createTheme({
  palette: {
    // mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <FlotasProvider>
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <Game />
        </Box>
      </FlotasProvider>
    </ThemeProvider>
  );
};

export default App;
