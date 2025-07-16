import { createContext, useMemo } from 'react';

const context = createContext({
    learnerId: undefined
});

export function Provider({ learnerId, children }) {
    const value = useMemo(() => ({ learnerId }), [learnerId]);

    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    );
}

export default context;