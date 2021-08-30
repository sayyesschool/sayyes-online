import React, { useState } from 'react';
import {
    TextField,
    Typography
} from 'mdc-react';

import { parseText } from 'shared/utils/exercise';

export default function TextExerciseContent({ exercise, checked }) {
    return (
        <div>
            {exercise.items.map(item =>
                <TextExerciseItem
                    key={item.id}
                    item={item}
                    checked={checked}
                />
            )}
        </div>
    );
}

function TextExerciseItem({ item, checked }) {
    const [value, setValue] = useState('');

    const elements = parseText(item.text);

    return (
        <div className="text-exercise-item">
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