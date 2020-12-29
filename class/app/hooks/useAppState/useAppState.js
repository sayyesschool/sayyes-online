import { useContext } from 'react';

import { AppStateContext } from 'app/contexts/AppStateContext';

export default function useAppState() {
    const context = useContext(AppStateContext);

    if (!context) {
        throw new Error('useAppState must be used within the AppStateProvider');
    }

    return context;
}