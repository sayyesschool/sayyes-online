import { teamsTheme } from '@fluentui/react-northstar';
import '@fluentui/react-icons-northstar';

export default {
    ...teamsTheme,
    fontFaces: [],
    siteVariables: {
        ...teamsTheme.siteVariables,
        bodyFontFamily: 'Nunito, Arial, Helvetica, Segoe UI, sans-serif'
    }
};