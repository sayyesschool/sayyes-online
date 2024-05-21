import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { unstable_ClassNameGenerator } from '@mui/utils';

unstable_ClassNameGenerator.configure(componentName => componentName.replace('Mui', 'ui-'));

const theme = extendTheme({
    fontFamily: {
        body: 'Nunito, Arial, Helvetica, Segoe UI, sans-serif',
        display: 'Nunito, Arial, Helvetica, Segoe UI, sans-serif'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: '#efe7f4',
                    100: '#ccb6de',
                    200: '#b392ce',
                    300: '#9060b7',
                    400: '#7b41a9',
                    500: '#5a1294',
                    600: '#521087',
                    700: '#400d69',
                    800: '#320a51',
                    900: '#26083e'
                }
            }
        }
    },
    components: {
        JoyAspectRatio: {
            styleOverrides: {
                content: {
                    backgroundColor: 'transparent'
                }
            }
        },
        JoyListItemButton: {
            styleOverrides: {
                root: {
                    flex: 1,
                    gap: '.5rem'
                }
            }
        },
        JoyListItemDecorator: {
            styleOverrides: {
                root: {
                    marginInlineEnd: 'unset'
                }
            }
        },
        JoyModal: {
            styleOverrides: {
                root: {
                    zIndex: 100
                },
                backdrop: () => ({
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'none'
                })
            }
        },
        JoyModalDialog: {
            styleOverrides: {
                root: () => ({
                    '--ModalDialog-minWidth': '480px',
                    boxShadow: '0 0 8px rgba(0,0,0,0.12), 0 32px 64px rgba(0,0,0,0.14)'
                })
            }
        },
        JoyTabs: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent'
                }
            }
        },
        JoyTable: {
            styleOverrides: {
                root: {
                    tableLayout: 'auto'
                }
            }
        }
    }
});

export {
    theme as default,
    theme,
    CssVarsProvider as ThemeProvider
};