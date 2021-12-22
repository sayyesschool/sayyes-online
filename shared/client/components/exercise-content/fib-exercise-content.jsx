import { useMemo } from 'react';
import { parseText, parseHTML } from 'shared/libs/exercise';
import { render } from 'shared/libs/jsx';

import Input from 'shared/components/inline-input';
import Select from 'shared/components/inline-select';
import Textarea from 'shared/components/inline-textarea';

const Components = {
    input: Input,
    select: Select,
    textarea: Textarea
};

export default function FIBExerciseContent({ exercise, checked }) {
    const items = useMemo(() => {
        let id = 1;

        return exercise.items
            .map(item => item.html ? parseHTML(item.text) : parseText(item.text))
            .map(item => render(item, item => item.type in Components ? {
                ...item,
                type: Components[item.type],
                props: {
                    key: id++,
                    checked,
                    ...item.props
                }
            } : item));
    }, [checked]);

    return items;
}