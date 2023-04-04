import { createContext, useReducer, useState } from 'react';

import { initialSettings } from 'app/data/settings';
import useActiveSinkId from 'app/hooks/useActiveSinkId';

import settingsReducer from './settingsReducer';

export const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
    const [activeSinkId, setActiveSinkId] = useActiveSinkId();
    const [settings, dispatchSetting] = useReducer(settingsReducer, initialSettings);
    const [isFetching, setIsFetching] = useState(false);
    const [isKrispEnabled, setIsKrispEnabled] = useState(false);
    const [isKrispInstalled, setIsKrispInstalled] = useState(false);
    const [error, setError] = useState(null);

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