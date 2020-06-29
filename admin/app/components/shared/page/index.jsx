import React from 'react';

export default function Page({ id, children }) {
    return (
        <article id={`${id}-page`} className="page">
            {children}
        </article>
    );
}