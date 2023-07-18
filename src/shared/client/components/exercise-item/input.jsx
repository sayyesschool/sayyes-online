import { useCallback } from 'react';

import Input from 'shared/components/inline-input';
import Textarea from 'shared/components/inline-textarea';
import TextContent from 'shared/components/text-content';
import { Flex } from 'shared/ui-components';

import './input.scss';

export default function InputItem({
    id,
    text,
    values,
    inline,
    checked,
    state = '',
    onUpdateState,
    className
}) {
    const handleChange = useCallback(value => {
        onUpdateState(id, value);
    }, [id, onUpdateState]);

    const Component = inline ? Input : Textarea;

    return (
        <div className={className}>
            <Flex direction={inline ? 'row' : 'column'} gap="small">
                {text &&
                    <TextContent text={text} />
                }

                <Component
                    value={state}
                    correctValues={values}
                    checked={checked}
                    required
                    onChange={handleChange}
                />
            </Flex>
        </div>
    );
}