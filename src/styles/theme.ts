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
          color: '#000',
        },
        h1: {
          fontWeight: 500,
          fontSize: '1.7143em',
        },
        h2: {
          fontWeight: 500,
          fontSize: '1.4286em',
        },
        h3: {
          fontWeight: 500,
          fontSize: '1.2857em',
        },
        h4: {
          fontWeight: 500,
          fontSize: '1.1429em',
        },
        body1: {
          fontWeight: 500,
          fontSize: '1em',
        },
        body2: {
          fontWeight: 500,
          fontSize: '1em',
        },
        subtitle1: {
          fontWeight: 500,
          fontSize: '1em',
        },
        subtitle2: {
          fontWeight: 500,
          fontSize: '1em',
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
        text: {
          color: '#4e473f',
          backgroundColor: '#transparent',
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#4e473f',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '0.75em',
          fontSize: '1em',
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
          backgroundColor: '#f2f0ee',
          color: '#fff',
          height: '3.4286em',
          boxShadow: 'none',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '3em',
          [theme.breakpoints.up('sm')]: {
            minHeight: '3em',
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
