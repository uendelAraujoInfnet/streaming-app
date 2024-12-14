// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import theme from "./theme";
// import { ThemeProvider } from "@mui/material/styles";
// import { AuthProvider } from "./context/AuthContext";
// import "./index.css";

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(
//   <ThemeProvider theme={theme}>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </ThemeProvider>
// );

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  
    <App />
  
);
