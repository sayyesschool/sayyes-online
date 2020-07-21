import React from 'react';
import {
    CircularProgress
} from 'mdc-react';

import './index.scss';

export default function PageContent({ loading, children }) {
    return (
        <section className="page-content">
            {loading ? <CircularProgress indeterminate /> : children}
        </section>
    );
}