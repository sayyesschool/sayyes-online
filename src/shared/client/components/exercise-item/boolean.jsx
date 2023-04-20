import { useCallback } from 'react';
import classnames from 'classnames';

import TextContent from 'shared/components/text-content';
import { List, Switch } from 'shared/ui-components';

export default function ExerciseBooleanItem({
    item,
    checked,
    selected,
    state,
    onUpdateState
}) {
    const handleChange = useCallback(itemId => {
        onUpdateState(item.id, {
            ...state,
            [itemId]: state ? !state[itemId] : true
        });
    }, [item, state, onUpdateState]);

    return (
        <>
            <TextContent>{item.text}</TextContent>

            <List>
                {item.items?.map(item =>
                    <List.Item
                        key={item.id}
                        className={classnames('ExerciseBooleanListItem', checked && {
                            'ExerciseBooleanListItem--correct': state[item.id] === selected,
                            'ExerciseBooleanListItem--incorrect': state[item.id] !== selected,
                        })}
                        content={item.text}
                        endAction={
                            <Switch
                                checked={selected}
                                disabled={selected}
                                size="sm"
                                onChange={() => handleChange(item.id)}
                            />
                        }
                        selected={selected}
                    />
                )}
            </List>
        </>
    );
}