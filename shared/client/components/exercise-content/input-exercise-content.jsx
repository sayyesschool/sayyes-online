import { useCallback } from 'react';
import {
    Typography
} from 'mdc-react';
import classnames from 'classnames';

import Input from 'shared/components/inline-input';
import Textarea from 'shared/components/inline-textarea';

export default function InputExerciseContent({ exercise, state = {}, setState, checked }) {
    const handleChange = useCallback((itemId, value) => {
        setState((state = {}) => ({
            ...state,
            [itemId]: value
        }));
    }, []);

    return (exercise.items.map(item =>
        <InputExerciseItem
            key={item.id}
            item={item}
            value={state[item.id]}
            checked={checked}
            onChange={handleChange}
        />
    ));
}

function InputExerciseItem({ item, value, checked, onChange }) {
    const handleChange = useCallback(value => {
        onChange(item.id, value);
    }, [item, onChange]);

    const classNames = classnames('exercise-item', 'input-exercise-item', {
        'input-exercise-item--correct': checked && isItemCorrect(item, value)
    });

    return (
        <div className={classNames}>
            {item.text &&
                <Typography>
                    {item.text}

                    {item.inline &&
                        <Input
                            id={item.id}
                            value={value}
                            onChange={handleChange}
                        />
                    }
                </Typography>
            }

            {!item.inline &&
                <Textarea
                    id={item.id}
                    value={value}
                    onChange={handleChange}
                />
            }
        </div>
    );
}

function isItemCorrect(item, value) {
    return item.answers?.includes(value.trim().toLocaleLowerCase());
}