import { useCallback } from 'react';

import Content from 'shared/components/content';
import Input from 'shared/components/inline-input';
import Textarea from 'shared/components/inline-textarea';
import { Flex } from 'shared/ui-components';

import './Input.scss';

export default function InputItem({
    id,
    text,
    values,
    inline,
    checked,
    readOnly,
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
                    <Content text={text} />
                }

                <Component
                    value={state}
                    correctValues={values}
                    checked={checked}
                    readOnly={readOnly}
                    required
                    onChange={handleChange}
                />
            </Flex>
        </div>
    );
}