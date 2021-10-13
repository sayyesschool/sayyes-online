import React, { useState } from 'react';
import {
    Typography
} from 'mdc-react';

import { parseText } from 'shared/utils/exercise';
import TextField from 'shared/components/text-field';

export default function InputExerciseContent({ exercise, checked }) {
    return (exercise.items.map(item =>
        <InputExerciseItem
            key={item.id}
            item={item}
            checked={checked}
        />
    ));
}

function InputExerciseItem({ item, checked }) {
    const [value, setValue] = useState('');

    const elements = parseText(item.text);

    return (
        <div className="input-exercise-item">
            <Typography>{elements}</Typography>

            {elements.length === 1 &&
                <TextField
                    className={checked && !item.answers.includes(value.trim().toLocaleLowerCase()) && 'mdc-text-field--invalid'}
                    value={value}
                    filled
                    textarea
                    autoResize
                    required
                    disabled={checked}
                    onChange={event => setValue(event.target.value)}
                />
            }
        </div>
    );
}