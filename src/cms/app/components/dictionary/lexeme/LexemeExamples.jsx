import { useCallback, useEffect, useState } from 'react';

import { Avatar, Checkbox, Flex, Heading, List } from 'shared/ui-components';

import styles from './LexemeExamples.module.scss';

export default function LexemeExamples({ title, examples, readOnly, onChangeExamples }) {
    const [activeExamples, setActiveExamples] = useState([]);

    const handleToggleExample = useCallback(example => {
        const hasInExamples = activeExamples.find(ex => ex.id === example.id);
        const examples = hasInExamples ? activeExamples.filter(ex => ex.id !== example.id) : [...activeExamples, example];

        setActiveExamples(examples);
    }, [activeExamples]);

    useEffect(() => {
        if (!onChangeExamples) return;

        onChangeExamples(activeExamples);
    }, [activeExamples]);

    return (
        <section className={styles.root}>
            <Heading
                content={title}
                color="neutral"
                type="title-md"
            />

            <List>
                {examples.map((example, index, array) => {
                    const isChecked = !!activeExamples.find(ex => ex.id === example.id);

                    return (
                        <div key={example.id}>
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                                className={styles.notificationConfirmation}
                            >
                                <List.Item
                                    className={styles.example}
                                    decorator={
                                        <Avatar
                                            content={index + 1} color="neutral"
                                            size="sm"
                                        />
                                    }
                                    content={{
                                        primary: example.text,
                                        secondary: example.translation
                                    }}
                                />

                                {!readOnly && (
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={() => handleToggleExample(example)}
                                    />
                                )}
                            </Flex>

                            {index < array.length - 1 &&
                                <List.Divider inset="startContent" />
                            }
                        </div>
                    );
                })}
            </List>
        </section>
    );
}