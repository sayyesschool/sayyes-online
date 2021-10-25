import { useState } from 'react';

import './index.scss';

export default function InlineInput({ values, ...props }) {
    const [value, setValue] = useState('');

    return (
        <span className="inline-input">
            <span>{value}</span>

            <input
                value={value}
                onChange={event => setValue(event.target.value)}
                {...props}
            />
        </span>
    );
}