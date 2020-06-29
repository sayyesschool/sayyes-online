import React from 'react';

import './index.scss';

export default function AppContent({ children }) {
    return (
        <main id="app-content">
            {children}
        </main>
    );
}