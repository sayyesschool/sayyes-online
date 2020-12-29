import React, { createContext, useState, useReducer } from 'react';

import { initialSettings } from 'app/data/settings';
import useActiveSinkId from 'app/hooks/useActiveSinkId';

import settingsReducer from './settingsReducer';

export const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
    const [activeSinkId, setActiveSinkId] = useActiveSinkId();
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [settings, dispatchSetting] = useReducer(settingsReducer, initialSettings);

    return (
        <AppStateContext.Provider
            value={{
                error,
                setError,
                isFetching,
                activeSinkId,
                setActiveSinkId,
                settings,
                dispatchSetting
            }}
        >
            {children}
        </AppStateContext.Provider>
    );
}