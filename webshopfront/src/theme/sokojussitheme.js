import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#006400', // Dark green
    },
    secondary: {
      main: '#FF8C00', // Dark orange
    },
    error: {
      main: '#8B0000', // Dark red
    },
    background: {
      default: '#ffd54f', // Light grey background for contrast
    },
  },
});

export default theme;