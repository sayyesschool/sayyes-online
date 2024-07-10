import { Avatar, Heading, List } from 'shared/ui-components';

import styles from './LexemeView.module.scss';

export default function LexemeExamples({ title, examples }) {
    return (
        <section className={styles.examples}>
            <Heading content={title} type="title-md" />

            <List>
                {examples.map((example, index, array) => (
                    <div key={example.id}>
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

                        {index < array.length - 1 && <List.Divider inset="startContent" />}
                    </div>
                ))}
            </List>
        </section>
    );
}