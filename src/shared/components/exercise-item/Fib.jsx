import { useCallback, useMemo } from 'react';

import { parseFromHtml } from 'shared/libs/eml';
import { render } from 'shared/libs/jsx';
import Content from 'shared/components/content';
import Input from 'shared/components/inline-input';
import Select from 'shared/components/inline-select';

import './Fib.scss';

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

        return render(parseFromHtml(content || ''), item => {
            if (typeof item === 'object')
                item.props.key = key++;

            if (item.type in Components) {
                item.type = Components[item.type];
                item.props.id = item.id;
                item.props.value = state[item.props.id];
                item.props.completed = completed;
                item.props.checked = checked;
                item.props.onChange = handleChange;
            }

            return item;
        });
    }, [content, checked, handleChange]);

    return (
        <div className={className}>
            <Content>
                {memoedContent}
            </Content>
        </div>
    );
}