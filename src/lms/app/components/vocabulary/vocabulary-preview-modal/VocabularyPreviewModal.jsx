import { Dialog } from 'shared/ui-components';
import { Image, Surface, Text } from 'shared/ui-components';

import styles from './VocabularyPreviewModal.module.scss';

export default function VocabularyPreviewModal({ lexeme, onClose, open }) {
    const { value, definition, translations, examples } = lexeme;
    const areExamplesEmpty = !!examples.length;
    const translationsString = translations.join(', ');

    return (
        <Dialog
            open={open}
            onClose={onClose}

        >
            <Surface className={styles.sheet}>
                <Image src={'https://f.vividscreen.info/soft/291c16af775a20f0b35a389824cd145f/Kitty-Photo-2048x2048.jpg'} className={styles.img} alt="" />
                <Text color="primary" fontSize="xl" className={styles.value}>{value}</Text>
                <Text className={styles.definition}>{definition}</Text>
                <Text color="warning" level="title-lg" className={styles.translations}>{translationsString}</Text>

                {areExamplesEmpty && (
                    <Surface className={styles.examples}>
                        <Text>Примеры:</Text>

                        {examples.map((example, index) => (
                            <Surface key={index} className={styles.example}>
                                <Text>{example.text}</Text>
                                <Text>{example.translation}</Text>
                            </Surface>
                        ))}
                    </Surface>
                )}
            </Surface>
        </Dialog>
    );
}