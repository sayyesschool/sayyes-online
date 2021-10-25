import { useState } from 'react';
import {
    Typography
} from 'mdc-react';
import classnames from 'classnames';

import { parseText } from 'shared/libs/exercise';
import Input from 'shared/components/inline-input';
import Textarea from 'shared/components/inline-textarea';

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
    const correct = (checked && item.answers?.length > 0) ?
        item.answers.includes(value.trim().toLocaleLowerCase()) : true;
    const classNames = classnames('exercise-item', 'input-exercise-item', {
        'input-exercise-item--correct': correct
    });

    return (
        <div className={classNames}>
            <Typography>
                {elements}

                {item.inline &&
                    <Input
                        id={item.id}
                    />
                }
            </Typography>

            {!item.inline &&
                <Textarea
                    id={item.id}
                />
            }
        </div>
    );
}