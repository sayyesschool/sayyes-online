import { createContext } from 'react';

import timezones from 'shared/../data/timezones';

export default createContext({
    timezones: new Map(timezones.map(({ value, text }) => [value, text]))
});