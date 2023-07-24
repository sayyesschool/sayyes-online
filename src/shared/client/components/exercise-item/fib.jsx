import { useCallback, useMemo } from 'react';

import { parseHTML } from 'shared/libs/eml';
import { render } from 'shared/libs/jsx';
import Content from 'shared/components/content';
import Input from 'shared/components/inline-input';
import Select from 'shared/components/inline-select';

import './fib.scss';

const Components = {
    input: Input,
    select: Select
};

export default function FibItem({
    id,
    content,
    checked,
    completed,
    state = {},
    onUpdateState,
    className
}) {
    const handleChange = useCallback((value, element) => {
        const { id: itemId } = element.dataset;

        if (!itemId) return;

        onUpdateState(id, state => ({
            ...state,
            [itemId]: value
        }));
    }, [id, onUpdateState]);

    const memoedContent = useMemo(() => {
        let key = 1;

        return render(parseHTML(content || ''), item => {
            if (typeof item === 'object')
                item.key = key++;

            if (item.type in Components) {
                item.type = Components[item.type];
                item.props.value = state[item.props.id];
                item.props.completed = completed;
                item.props.checked = checked;
                item.props.onChange = handleChange;
            }

            return item;
        });
    }, [checked]);

    return (
        <div className={className}>
            <Content>
                {memoedContent}
            </Content>
        </div>
    );
}