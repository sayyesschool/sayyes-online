import { useCallback } from 'react';
import classnames from 'classnames';

import TextContent from 'shared/components/text-content';
import { Checkbox, List } from 'shared/ui-components';

export default function ExerciseBooleanItem({
    item,
    checked,
    selected,
    state = {},
    setState
}) {
    const handleChange = useCallback(selected => {
        setState((state = {}) => ({
            ...state,
            [item.id]: selected
        }));
    }, [item]);

    return (
        <>
            <TextContent>{item.text}</TextContent>

            <List>
                {item.items?.map(item =>
                    <List.Item
                        key={item.id}
                        className={checked && classnames({
                            'correct': item.correct === selected,
                            'incorrect': item.correct !== selected,
                        })}
                        header={item.text}
                        decorator={
                            <Checkbox
                                checked={selected}
                                disabled={selected}
                            />
                        }
                        selected={selected}
                        onClick={() => handleChange(!selected)}
                    />
                )}
            </List>
        </>
    );
}