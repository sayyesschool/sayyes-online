import React from 'react';

import './index.scss';

export default function RoomContent({
    children,
    ...props
}) {
    return (
        <section className="room__content" {...props}>
            {children}
        </section>
    );
}