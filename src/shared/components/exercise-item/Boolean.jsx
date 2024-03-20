import { useCallback } from 'react';

import Content from 'shared/components/content';
import { List, Switch } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

import './Boolean.scss';

export default function BooleanItem({
    content,
    items,
    checked,
    selected,
    state,
    onUpdateState,
    className
}) {
    const handleChange = useCallback(itemId => {
        onUpdateState(itemId, {
            ...state,
            [itemId]: state ? !state[itemId] : true
        });
    }, [state, onUpdateState]);

    return (
        <div className={className}>
            <Content content={content} html />

            <List>
                {items?.map(item =>
                    <List.Item
                        key={item.id}
                        className={classnames('BooleanListItem', checked && {
                            'BooleanListItem--correct': state[item.id] === selected,
                            'BooleanListItem--incorrect': state[item.id] !== selected,
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
        </div>
    );
}