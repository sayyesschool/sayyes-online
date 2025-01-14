import { useCallback } from 'react';

import { Avatar, Checkbox, Flex, Heading, List } from 'shared/ui-components';

import styles from './LexemeExamples.module.scss';

export default function LexemeExamples({ title, examples, addExamples = [], onChangeAddExamples }) {
    const readOnly = !onChangeAddExamples;

    const handleCheckboxChange = useCallback(example => {
        const updatedExamples = addExamples.find(ex => ex?.id === example.id)
            ? addExamples.filter(ex => ex.id !== example.id)
            : [...addExamples, example];
        onChangeAddExamples(updatedExamples);
    }, [addExamples, onChangeAddExamples]);

    return (
        <section className={styles.root}>
            <Heading
                content={title}
                color="neutral"
                type="title-md"
            />

            <List>
                {examples.map((example, index, array) => {
                    const hasInaddExamples = !!addExamples.find(ex => ex?.id === example.id);

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
                                        checked={hasInaddExamples}
                                        onChange={() => handleCheckboxChange(example)}
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