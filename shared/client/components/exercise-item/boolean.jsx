import { useCallback } from 'react';
import classnames from 'classnames';

import Checkbox from 'shared/ui-components/checkbox';
import List from 'shared/ui-components/list';
import TextContent from 'shared/components/text-content';

export default function ExerciseBooleanItem({ item, checked, selected, state = {}, setState }) {
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
                        endMedia={
                            <Checkbox
                                checked={selected}
                                disabled={selected}
                                toggle
                            />
                        }
                        selected={selected}
                        selectable
                        onClick={() => handleChange(!selected)}
                    />
                )}
            </List>
        </>
    );
}