import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'rgba(0,0,0,.6)',
          '&:hover': {
            backgroundColor: '#cae5fa',
          },
          '&:active': {
            backgroundColor: '#55b2fa',
          },
        },
      },
    },
  },
});

export default theme;