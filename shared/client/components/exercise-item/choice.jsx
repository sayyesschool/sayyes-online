import { useCallback, useMemo } from 'react';
import { Checkbox, List, RadioGroupItem } from '@fluentui/react-northstar';
import classnames from 'classnames';

import Icon from 'shared/components/icon';
import TextContent from 'shared/components/text-content';

function getDefaultState(item) {
    return item.items?.filter(item => item.correct).length > 1 ? [] : undefined;
}

export default function ExerciseChoiceItem({
    item,
    checked,
    state = getDefaultState(item),
    setState
}) {
    const isMultiple = useMemo(() => item.items?.filter(item => item.correct).length > 1);

    const handleChange = useCallback(item => {
        if (isMultiple) {
            setState((chosenItems = []) => chosenItems.includes(item.id) ?
                chosenItems.filter(id => id !== item.id) :
                chosenItems.concat(item.id)
            );
        } else {
            setState(item.id);
        }
    }, [isMultiple]);

    const isItemChosen = useCallback(item => {
        if (isMultiple) {
            return state.includes(item.id);
        } else {
            return item.id === state;
        }
    }, [state, isMultiple]);

    return (
        <>
            <TextContent>{item.text}</TextContent>

            <List element="div">
                {item.items?.map(item =>
                    <List.Item
                        key={item.id}
                        as="label"
                        className={classnames('exercise-choice-item', checked && {
                            'exercise-choice-item--correct': item.correct,
                            'exercise-choice-item--incorrect': !item.correct && isItemChosen(item)
                        })}
                        media={isMultiple ?
                            <Checkbox
                                checked={state.includes(item.id)}
                                disabled={checked}
                            />
                            :
                            <RadioGroupItem
                                checked={item.id === state}
                                indicator={<Icon>radio_button_unchecked</Icon>}
                                checkedIndicator={<Icon>radio_button_checked</Icon>}
                                disabled={checked}
                            />
                        }
                        content={item.text}
                        selected={checked && (item.correct || isItemChosen(item))}
                        selectable
                        onClick={() => handleChange(item)}
                    />
                )}
            </List>
        </>
    );
}