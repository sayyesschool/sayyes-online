import { createContext } from 'react';

import { timezonesMap } from 'shared/data/timezones';

export default createContext({
    timezones: timezonesMap
});