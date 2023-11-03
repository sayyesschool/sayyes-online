import { useCallback, useMemo } from 'react';
import classnames from 'classnames';

import Content from 'shared/components/content';
import { Checkbox, List, Radio } from 'shared/ui-components';

import './Choice.scss';

export default function ChoiceItem({
    id,
    content,
    items = [],
    checked,
    state = getDefaultState(items),
    onUpdateState,
    className,
}) {
    const isMultiple = useMemo(() => items.filter(item => item.correct).length > 1);

    const handleChange = useCallback(item => {
        if (isMultiple) {
            onUpdateState(id, state.includes(item.id) ?
                state.filter(itemId => itemId !== item.id) :
                state.concat(item.id)
            );
        } else {
            onUpdateState(id, item.id);
        }
    }, [id, isMultiple, state, onUpdateState]);

    const isItemChosen = useCallback(item => {
        if (isMultiple) {
            return state.includes(item.id);
        } else {
            return item.id === state;
        }
    }, [state, isMultiple]);

    return (
        <div className={className}>
            <Content content={content} html />

            <List>
                {items?.map(item =>
                    <List.Item
                        key={item.id}
                        as="label"
                        className={classnames('ChoiceListItem', checked && {
                            'ChoiceListItem--correct': item.correct,
                            'ChoiceListItem--incorrect': !item.correct && isItemChosen(item)
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
        </div>
    );
}

function getDefaultState(items) {
    return items.filter(item => item.correct).length > 1 ? [] : undefined;
}