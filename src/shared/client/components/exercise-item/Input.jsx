import { useCallback } from 'react';

import Input from 'shared/components/inline-input';
import Textarea from 'shared/components/inline-textarea';
import TextContent from 'shared/components/text-content';

export default function ExerciseInputItem({
    item,
    checked,
    state: value = '',
    onUpdateState
}) {
    const handleChange = useCallback(value => {
        onUpdateState(item.id, value);
    }, [item, onUpdateState]);

    const Component = item.inline ? Input : Textarea;

    return (<>
        {item.text &&
            <TextContent>{item.text}</TextContent>
        }

        <Component
            value={value}
            correctValues={item.items}
            checked={checked}
            required
            onChange={handleChange}
        />
    </>);
}