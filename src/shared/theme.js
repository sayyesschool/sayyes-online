import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
// import { unstable_ClassNameGenerator } from '@mui/utils';

// unstable_ClassNameGenerator.configure(componentName => componentName.replace('Mui', 'ui-'));

const config = {
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
                },
                secondary: {
                    50: '#fde8f3',
                    100: '#f8b8d9',
                    200: '#f495c7',
                    300: '#ef65ad',
                    400: '#ec479d',
                    500: '#e71985',
                    600: '#d21779',
                    700: '#a4125e',
                    800: '#7f0e49',
                    900: '#610b38',
                    solidBg: 'var(--joy-palette-secondary-400)',
                    solidActiveBg: 'var(--joy-palette-secondary-500)',
                    outlinedBorder: 'var(--joy-palette-secondary-500)',
                    outlinedColor: 'var(--joy-palette-secondary-700)',
                    outlinedActiveBg: 'var(--joy-palette-secondary-100)',
                    softColor: 'var(--joy-palette-secondary-800)',
                    softBg: 'var(--joy-palette-secondary-200)',
                    softActiveBg: 'var(--joy-palette-secondary-300)',
                    plainColor: 'var(--joy-palette-secondary-700)',
                    plainActiveBg: 'var(--joy-palette-secondary-100)'
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
                    marginInlineEnd: 'unset',
                    minInlineSize: '20px'
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
                    tableLayout: 'auto',
                    headBackground: 'transparent'
                }
            }
        }
    }
};

const theme = extendTheme(config);

const newTheme = extendTheme({
    ...config,
    fontFamily: {
        body: 'Raleway, Arial, Helvetica, Segoe UI, sans-serif',
        display: 'Raleway, Arial, Helvetica, Segoe UI, sans-serif'
    },
    components: {
        ...config.components,
        JoyButton: {
            styleOverrides: {
                root: {
                    borderRadius: '40px'
                }
            }
        },
        JoyCard: {
            styleOverrides: {
                root: {
                    borderRadius: '20px'
                }
            }
        },
        JoyCardOverflow: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    overflow: 'hidden'
                }
            }
        },
        JoyModalDialog: {
            styleOverrides: {
                root: {
                    borderRadius: '20px'
                }
            }
        }
    }
});

export {
    theme as default,
    newTheme,
    theme,
    CssVarsProvider as ThemeProvider
};