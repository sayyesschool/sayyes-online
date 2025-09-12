import { useCallback } from 'react';

import Content from 'shared/components/content';
import { List, Switch } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

import './Boolean.scss';

export default function BooleanItem({
    id,
    content,
    items = [],
    checked,
    readOnly,
    state = [],
    onUpdateState,
    className
}) {
    const handleChange = useCallback(itemId => {
        onUpdateState(id, state.includes(itemId) ?
            state.filter(_itemId => _itemId !== itemId) :
            state.concat(itemId)
        );
    }, [id, onUpdateState, state]);

    const isItemChosen = useCallback(item => {
        return state.includes(item.id);
    }, [state]);

    return (
        <div className={className}>
            <Content content={content} html />

            <List>
                {items?.map(item =>
                    <List.Item
                        key={item.id}
                        className={classnames('BooleanListItem', checked && {
                            'BooleanListItem--correct': item.correct,
                            'BooleanListItem--incorrect': !item.correct && isItemChosen(item)
                        })}
                        content={item.text}
                        endAction={
                            <Switch
                                checked={state?.includes(item.id)}
                                size="sm"
                                onChange={readOnly ? undefined : () => handleChange(item.id)}
                            />
                        }
                    />
                )}
            </List>
        </div>
    );
}