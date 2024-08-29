import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    red: Palette['primary'];
  }
  interface PaletteOptions {
    red?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    red: true;
  }
}

// 기본 테마 생성
const theme = createTheme();

const redColor = theme.palette.augmentColor({
  color: {
    main: '#FF5733',
  },
});

const customizedTheme = createTheme({
  palette: {
    primary: {
      main: '#4e473f',
      light: '#f3f3f3',
      dark: '#5f5042',
      contrastText: '#222',
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      contrastText: '#47008F',
    },
    red: redColor,
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h2',
          subtitle2: 'h3',
          body1: 'p',
          body2: 'span',
        },
      },
      styleOverrides: {
        root: {
          color: '#222',
        },
        h1: {
          color: '#222',
          fontWeight: 800,
          fontSize: '1.75em',
        },
        h2: {
          color: '#222',
          fontWeight: 600,
          fontSize: '1.55em',
        },
        body1: {
          fontSize: '1em',
          color: '#333',
        },
        body2: {
          fontSize: '1em',
          color: '#333',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1em',
          '&:hover': {
            backgroundColor: '#4e473f',
            color: '#fff',
          },
        },
        // sizeSmall: {
        //   width: '1.5em',
        //   height: '1.5em',
        //   fontSize: '1em',
        // },
        // sizeMedium: {
        //   width: '2.5em',
        //   height: '2.5em',
        //   fontSize: '1.25em',
        //   padding: '0.75em',
        // },
        // sizeLarge: {
        //   width: '3em',
        //   height: '3em',
        //   fontSize: '1.5em',
        // },
        contained: {
          backgroundColor: '#4e473f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#5f5042',
          },
        },
        outlined: {
          borderColor: '#4e473f',
          color: '#4e473f',
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#4e473f',
            borderColor: '#4e473f',
            color: '#fff',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '0.75em',
        },
        sizeSmall: {
          width: '1.5em',
          height: '1.5em',
          fontSize: '1em',
        },
        sizeMedium: {
          width: '2.5em',
          height: '2.5em',
          fontSize: '1.25em',
          padding: '0.75em',
        },
        sizeLarge: {
          width: '3em',
          height: '3em',
          fontSize: '1.5em',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fbf9f7',
          color: '#fff',
          height: '3.5em',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '48px',
          [theme.breakpoints.up('sm')]: {
            minHeight: '3.5em',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#ddd',
          color: '#4e473f',
          fontSize: '.8em',
          padding: '0.875em',
        },
        arrow: {
          color: '#ddd',
        },
      },
    },
  },
});

export default customizedTheme;
