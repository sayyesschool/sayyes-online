import { useCallback, useMemo } from 'react';
import {
    Checkbox,
    List,
    RadioGroupItem
} from '@fluentui/react-northstar';
import classnames from 'classnames';

export default function ChoiceExerciseContent({
    exercise,
    checked,
    state = getDefaultState(exercise),
    setState
}) {
    const isMultiple = useMemo(() => exercise.items.filter(item => item.correct).length > 1);

    const handleChange = useCallback(item => {
        if (isMultiple) {
            setState(chosenItems => chosenItems.includes(item.id) ?
                chosenItems.filter(id => id !== item.id) :
                chosenItems.concat(item.id)
            );
        } else {
            setState(item.id);
        }
    }, []);

    const isItemChosen = useCallback(item => {
        if (isMultiple) {
            return state.includes(item.id);
        } else {
            return item.id === state;
        }
    }, [state]);

    return (
        <List element="div">
            {exercise.items.map(item =>
                <List.Item
                    key={item.id}
                    as="label"
                    className={classnames('choice-exercise-item', checked && {
                        'mdc-list-item--correct': item.correct,
                        'mdc-list-item--incorrect': !item.correct && isItemChosen(item)
                    })}
                    media={isMultiple &&
                        <Checkbox
                            checked={state.includes(item.id)}
                            onChange={() => handleChange(item)}
                            disabled={checked}
                        />
                    }
                    content={item.text}
                    endMedia={!isMultiple &&
                        <RadioGroupItem
                            checked={item.id === state}
                            onChange={() => handleChange(item)}
                            disabled={checked}
                        />
                    }
                    activated={checked && (item.correct || isItemChosen(item))}
                />
            )}
        </List>
    );
}

function getDefaultState(exercise) {
    return exercise.items.filter(item => item.correct).length > 1 ? [] : undefined;
}