import { useCallback, useMemo } from 'react';
import classnames from 'classnames';

import TextContent from 'shared/components/text-content';
import { Checkbox, List, Radio } from 'shared/ui-components';

export default function ExerciseChoiceItem({
    item,
    checked,
    state = getDefaultState(item),
    onUpdateState
}) {
    const isMultiple = useMemo(() => item.items?.filter(item => item.correct).length > 1);

    const handleChange = useCallback(_item => {
        if (isMultiple) {
            onUpdateState(item.id, state.includes(_item.id) ?
                state.filter(itemId => itemId !== _item.id) :
                state.concat(_item.id)
            );
        } else {
            onUpdateState(item.id, _item.id);
        }
    }, [item, isMultiple, state, onUpdateState]);

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

            <List>
                {item.items?.map(item =>
                    <List.Item
                        key={item.id}
                        as="label"
                        className={classnames('ExerciseChoiceListItem', checked && {
                            'ExerciseChoiceListItem--correct': item.correct,
                            'ExerciseChoiceListItem--incorrect': !item.correct && isItemChosen(item)
                        })}
                        decorator={isMultiple ?
                            <Checkbox
                                checked={state.includes(item.id)}
                                disabled={checked}
                            />
                            :
                            <Radio
                                checked={item.id === state}
                                disabled={checked}
                            />
                        }
                        content={item.text}
                        selected={checked && (item.correct || isItemChosen(item))}
                        interactive={!checked}
                        onClick={() => handleChange(item)}
                    />
                )}
            </List>
        </>
    );
}

function getDefaultState(item) {
    return item.items?.filter(item => item.correct).length > 1 ? [] : undefined;
}