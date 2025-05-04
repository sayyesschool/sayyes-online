import { Fragment, useCallback, useEffect, useState } from 'react';

import { Avatar, Checkbox, Heading, List } from 'shared/ui-components';

import styles from './LexemeExamples.module.scss';

export default function LexemeExamples({
    title,
    examples,
    readOnly,
    onChange
}) {
    const [activeExamples, setActiveExamples] = useState([]);

    useEffect(() => {
        onChange?.(activeExamples);
    }, [activeExamples, onChange]);

    const handleToggle = useCallback(example => {
        const hasInExamples = activeExamples.find(ex => ex.id === example.id);
        const examples = hasInExamples
            ? activeExamples.filter(ex => ex.id !== example.id)
            : [...activeExamples, example];

        setActiveExamples(examples);
    }, [activeExamples]);

    return (
        <section className={styles.root}>
            <Heading
                content={title}
                color="neutral"
                type="title-md"
            />

            <List>
                {examples.map((example, index, array) =>
                    <Fragment key={example.id}>
                        <List.Item
                            className={styles.item}
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
                            end={!readOnly && (
                                <Checkbox
                                    checked={!!activeExamples.find(ex => ex.id === example.id)}
                                    onChange={() => handleToggle(example)}
                                />
                            )}
                        />

                        {index < array.length - 1 &&
                            <List.Divider inset="startContent" />
                        }
                    </Fragment>
                )}
            </List>
        </section>
    );
}