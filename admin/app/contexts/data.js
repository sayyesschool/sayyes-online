import React from 'react';

import timezones from 'shared/../data/timezones';

export default React.createContext({
    timezones: new Map(timezones.map(({ value, text }) => [value, text]))
});