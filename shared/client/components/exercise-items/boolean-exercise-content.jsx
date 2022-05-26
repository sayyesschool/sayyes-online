import { useCallback } from 'react';
import {
    Checkbox,
    List
} from '@fluentui/react-northstar';
import classnames from 'classnames';

export default function BooleanExerciseContent({ exercise, checked, state = {}, setState }) {
    const handleChange = useCallback((item, selected) => {
        setState((state = {}) => ({
            ...state,
            [item.id]: selected
        }));
    }, []);

    return exercise.items?.length > 0 && (
        <List>
            {exercise.items.map(item =>
                <BooleanExerciseItem
                    key={item.id}
                    item={item}
                    selected={state[item.id]}
                    checked={checked}
                    onChange={handleChange}
                />
            )}
        </List>
    );
}

function BooleanExerciseItem({ item, selected, checked, onChange }) {
    const classNames = classnames('boolean-exercise-item', checked && {
        'mdc-list-item--correct': item.correct === selected,
        'mdc-list-item--incorrect': item.correct !== selected,
    });

    return (
        <List.Item
            className={classNames}
            content={item.text}
            contentMedia={
                <Checkbox
                    checked={selected}
                    disabled={selected}
                    toggle
                    onChange={() => onChange(item, !selected)}
                />
            }
            activated={selected}
        />
    );
}