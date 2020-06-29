import React from 'react';
import {
    Spinner
} from '@fluentui/react';

import './index.scss';

export default function PageContent({ loading, children }) {
    return (
        <section className="page-content">
            {loading ? <Spinner /> : children}
        </section>
    );
}