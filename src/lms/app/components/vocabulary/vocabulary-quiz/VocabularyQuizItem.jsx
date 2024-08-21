import VocabularyQuizStepper from './VocabularyQuizStepper';

import styles from './VocabularyQuizItem.module.scss';

export default function VocabularyQuizItem({ itemIndex, numberOfItems, children }) {
    return (
        <div className={styles.root}>
            <VocabularyQuizStepper
                itemIndex={itemIndex}
                numberOfItems={numberOfItems}
            />

            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}