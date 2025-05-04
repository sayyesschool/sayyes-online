import { useCallback } from 'react';

import { v4 as uuid } from 'uuid';

import { Button, Flex, Heading } from 'shared/ui-components';

import LexemeFormExample from './LexemeFormExample';

import styles from './LexemeFormExamples.module.scss';

export default function LexemeFormExamples({
    examples,
    disabled,
    readOnly,
    onChange,
    ...props
}) {
    const handleAdd = useCallback(() => {
        const newExample = {
            id: uuid(),
            text: '',
            translation: ''
        };

        onChange([...examples, newExample]);
    }, [examples, onChange]);

    const handleChange = useCallback((id, { target }) => {
        const { name, value } = target;

        onChange(examples.map(ex => ex.id !== id ? ex : {
            ...ex,
            [name]: value
        }));
    }, [examples, onChange]);

    const handleDelete = useCallback(id => {
        onChange(examples.filter(ex => ex.id !== id));
    }, [examples, onChange]);

    return (
        <div className={styles.root} {...props}>
            <Heading content="Примеры" type="title-sm" />

            <Flex gap="small" column>
                {examples.map((example, i) =>
                    <LexemeFormExample
                        key={example.id}
                        example={example}
                        number={i + 1}
                        readOnly={readOnly}
                        onChange={handleChange}
                        onDelete={handleDelete}
                    />
                )}

                {!readOnly &&
                    <Button
                        icon="add"
                        content="Добавить пример"
                        variant="outlined"
                        disabled={disabled}
                        onClick={handleAdd}
                    />
                }
            </Flex>
        </div>
    );
}