import { useMemo } from 'react';

import { parseHTML } from 'shared/libs/exercise';
import { render } from 'shared/libs/jsx';
import Input from 'shared/components/inline-input';
import Select from 'shared/components/inline-select';
import Textarea from 'shared/components/inline-textarea';

const Components = {
    input: Input,
    select: Select,
    textarea: Textarea
};

export default function ExerciseFIBItem({ item, checked }) {
    const content = useMemo(() => {
        let key = 1;

        return render(parseHTML(item.text || ''), item => {
            if (typeof item?.props === 'object') {
                item.props.key = key++;
            }

            if (item.type in Components) {
                item.type = Components[item.type];
                item.props.checked = checked;
            }

            return item;
        });
    }, [checked]);

    return content;
}