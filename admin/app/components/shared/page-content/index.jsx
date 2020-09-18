import React from 'react';

import './index.scss';

export default function PageContent({ children }) {
    return (
        <section className="page-content">
            {children}
        </section>
    );
}