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
                    50: '#ede7f6',
                    100: '#d1c4e9',
                    200: '#b39ddb',
                    300: '#9575cd',
                    400: '#7e57c2',
                    500: '#673ab7',
                    600: '#5e35b1',
                    700: '#512da8',
                    800: '#4527a0',
                    900: '#311b92'
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