import { useCallback } from 'react';

import Textarea from 'shared/ui-components/textarea';
import TextContent from 'shared/components/text-content';

export default function ExerciseInputItem({ item, state = {}, setState, checked }) {
    const handleChange = useCallback(event => {
        const value = event.target.value;

        setState((state = {}) => ({
            ...state,
            [item.id]: value
        }));
    }, [item]);

    const value = state[item.id];
    const isCorrect = isItemCorrect(item, value);

    return (
        <>
            <TextContent>{item.text}</TextContent>

            <Textarea
                id={item.id}
                value={value}
                error={checked && !isCorrect}
                fluid
                autoResize
                onChange={handleChange}
            />
        </>
    );
}

function isItemCorrect(item, value) {
    return item.items?.includes(value?.trim().toLocaleLowerCase());
}