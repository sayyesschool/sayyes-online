import { useState } from 'react';

import './index.scss';

export default function Select({ values }) {
    const [value, setValue] = useState('');

    return (
        <select
            className="inline-select"
            value={value}
            onChange={event => setValue(event.target.value)}
        >
            <option value="" />

            {values.map(value =>
                <option key={value} value={value}>{value}</option>
            )}
        </select>
    );
}