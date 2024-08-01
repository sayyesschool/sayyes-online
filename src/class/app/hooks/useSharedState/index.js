import { useContext } from 'react';

import { SharedStateContext } from 'class/contexts/SharedStateContext';

export default function useSharedStateContext() {
    const context = useContext(SharedStateContext);

    if (!context) {
        throw new Error('useSharedStateContext must be used within a SharedContextProvider');
    }

    return context;
}