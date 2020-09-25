import React from 'react';

import './index.scss';

export default function AppContent({ children }) {
    return (
        <div id="app-content" className="mdc-top-app-bar--fixed-adjust">
            {children}
        </div>
    );
}