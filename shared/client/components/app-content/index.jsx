import React from 'react';
import classnames from 'classnames';

import './index.scss';

export default function AppContent({ children, fixedAdjust, className, ...props }) {
    const classNames = classnames(className, {
        'mdc-top-app-bar--fixed-adjust': fixedAdjust
    });

    return (
        <div id="app-content" className={classNames}>
            {children}
        </div>
    );
}