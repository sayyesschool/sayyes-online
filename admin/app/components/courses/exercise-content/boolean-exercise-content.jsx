import React, { useState } from 'react';
import {
    List, ListItem,
    Switch
} from 'mdc-react';
import classnames from 'classnames';

export default function BooleanExerciseContent({ exercise, checked }) {
    return (
        <List>
            {exercise.items.map(item =>
                <BooleanExerciseItem
                    key={item.id}
                    item={item}
                    checked={checked}
                />
            )}
        </List>
    );
}

function BooleanExerciseItem({ item, checked }) {
    const [correct, setCorrect] = useState(false);

    const classNames = classnames('boolean-exercise-item', checked && {
        'mdc-list-item--correct': item.correct === correct,
        'mdc-list-item--incorrect': item.correct !== correct,
    });

    return (
        <ListItem
            className={classNames}
            text={item.text}
            meta={
                <Switch
                    checked={correct}
                    disabled={checked}
                    onChange={() => setCorrect(v => !v)}
                />
            }
            activated={checked}
        />
    );
}