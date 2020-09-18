import React from 'react';
import {
    CircularProgress
} from 'mdc-react';

export default function Page({ id, loading, children }) {
    return (
        <article id={`${id}-page`} className="page">
            {loading ? <CircularProgress indeterminate /> : children}
        </article>
    );
}