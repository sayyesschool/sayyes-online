import { useCallback, useMemo, useState } from 'react';
import {
    Checkbox,
    List, ListItem,
    Radio
} from 'mdc-react';
import classnames from 'classnames';

export default function ChoiceExerciseContent({ exercise, checked }) {
    const isMultiple = useMemo(() => exercise.items.filter(item => item.correct).length > 1);

    const [chosenItem, setChosenItem] = useState();
    const [chosenItems, setChosenItems] = useState([]);

    const handleChange = useCallback(item => {
        if (isMultiple) {
            setChosenItems(correct => correct.includes(item.id) ?
                correct.filter(id => id !== item.id) :
                correct.concat(item.id)
            );
        } else {
            setChosenItem(item);
        }
    }, []);

    const isItemChosen = useCallback(item => {
        if (isMultiple) {
            return chosenItems.includes(item.id);
        } else {
            return item === chosenItem;
        }
    }, [chosenItem, chosenItems]);

    return (
        <List element="div">
            {exercise.items.map(item =>
                <ListItem
                    key={item.id}
                    element="label"
                    className={classnames('choice-exercise-item', checked && {
                        'mdc-list-item--correct': item.correct,
                        'mdc-list-item--incorrect': !item.correct && isItemChosen(item)
                    })}
                    leadingCheckbox={isMultiple &&
                        <Checkbox
                            checked={chosenItems.includes(item.id)}
                            onChange={() => handleChange(item)}
                            disabled={checked}
                        />
                    }
                    leadingRadio={isMultiple &&
                        <Radio
                            checked={item === chosenItem}
                            onChange={() => handleChange(item)}
                            disabled={checked}
                        />
                    }
                    text={item.text}
                    activated={checked && (item.correct || isItemChosen(item))}
                />
            )}
        </List>
    );
}