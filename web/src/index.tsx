import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles"
import { Toaster } from 'react-hot-toast';
import { LoadScreen } from './components/loadscreen/loadscreen';
import './index.scss';

const darkTheme = createTheme({
  palette: {
      mode: "dark",
      primary: {
          main: "#ec4899"
      },
      secondary: {
          main: "#f50057"
      },
      background: {
          default: "#080810",
          paper: "#101020"
      }
  },
  typography: {
      fontFamily: "Titillium Web"
  }
})

// -- https://discord.gg/P8KKAb7D4q
// -- UI Projects for FiveM by totenmajkel_ (misiek_dev)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={darkTheme}>
    <StyledEngineProvider injectFirst>
      <Toaster
        position={"top-right"}
        toastOptions={{
          style: {
            color: "white",
            backgroundColor: "#1717179d",
            border: "1px solid #383838"
          },
        }}
      />

      <LoadScreen />
    </StyledEngineProvider>
  </ThemeProvider>
)

// -- https://discord.gg/P8KKAb7D4q
// -- UI Projects for FiveM by totenmajkel_ (misiek_dev)