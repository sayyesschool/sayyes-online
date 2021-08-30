import React from 'react';
import { useState } from 'react';

import './index.scss';

export default function InlineInput({ values }) {
    const [value, setValue] = useState('');

    return (
        <span
            className="inline-input"
            onInput={event => setValue(event.target.textContent)}
            contentEditable
        />
    );
}