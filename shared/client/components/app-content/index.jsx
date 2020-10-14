import React from 'react';
import classnames from 'classnames';

import './index.scss';

export default function AppContent({ children, className }) {
    const classNames = classnames(className);

    return (
        <div id="app-content" className={classNames}>
            {children}
        </div>
    );
}