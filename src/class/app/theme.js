import { teamsTheme, teamsDarkTheme } from '@fluentui/react-northstar';
import '@fluentui/react-icons-northstar';

export default {
    ...teamsDarkTheme,
    fontFaces: [],
    siteVariables: {
        ...teamsDarkTheme.siteVariables,
        bodyFontFamily: 'Nunito, Arial, Helvetica, Segoe UI, sans-serif'
    }
};