import { useCallback } from 'react';
import {
    List, ListItem,
    Switch
} from 'mdc-react';
import classnames from 'classnames';

export default function BooleanExerciseContent({ exercise, checked, state = {}, setState }) {
    const handleChange = useCallback((item, selected) => {
        setState((state = {}) => ({
            ...state,
            [item.id]: selected
        }));
    }, []);

    console.log('BooleanExerciseContent', state);

    return (
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
        <ListItem
            className={classNames}
            text={item.text}
            meta={
                <Switch
                    key={item.id}
                    selected={selected}
                    disabled={checked}
                    onChange={() => onChange(item, !selected)}
                />
            }
            activated={selected}
        />
    );
}