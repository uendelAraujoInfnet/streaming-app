import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Define o tema como escuro
    primary: {
      main: '#ff3d00', // Cor principal
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#121212', // Cor de fundo padrão
      paper: '#1c1c1c', // Cor de fundo dos elementos tipo "paper"
    },
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    // Personalizações de tipografia
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;