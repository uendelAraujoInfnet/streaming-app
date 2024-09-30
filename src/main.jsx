import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css"

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
