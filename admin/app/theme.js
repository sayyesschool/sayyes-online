import { teamsTheme, teamsDarkTheme } from '@fluentui/react-northstar';
import '@fluentui/react-icons-northstar';

export default {
    ...teamsTheme,
    fontFaces: [],
    siteVariables: {
        ...teamsTheme.siteVariables,
        bodyFontFamily: 'Nunito, Arial, Helvetica, Segoe UI, sans-serif'
    }
};

// {
//     50: '#e8ebfa',
//     100: '#dce0fa',
//     200: '#c5cbfa',
//     300: '#9299f7',
//     400: '#7f85f5',
//     450: '#7f85f5',
//     500: '#7579eb',
//     600: '#5b5fc7',
//     700: '#4f52b2',
//     800: '#444791',
//     900: '#3d3e78',
//     1000: '#2f2f4a',
// }