import React, { createContext } from 'react';

import { useSyncDoc } from 'shared/hooks/twilio';

export const SharedStateContext = createContext(null);

export function SharedStateProvider({
    token,
    docId,
    children
}) {
    const syncDoc = useSyncDoc(token, docId);

    return (
        <SharedStateContext.Provider
            value={syncDoc}
        >
            {children}
        </SharedStateContext.Provider>
    );
}