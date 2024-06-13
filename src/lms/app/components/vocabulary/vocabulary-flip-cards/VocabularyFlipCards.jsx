import { useState } from 'react';

import { Button, FlipCard, StatusCircles } from 'shared/ui-components';

import styles from './VocabularyFlipCards.module.scss';

export default function VocabularyFlipCards({ lexeme, updateStatus }) {
    const [isCardFlip, setIsCardFlip] = useState(false);
    const { id, value, translations, record } = lexeme;
    const translationString = translations.join(', ');

    const downStatus = () => {
        const newStatus = record?.status - 1;

        updateStatus(id, newStatus);
        setIsCardFlip(false);
    };

    const upStatus = () => {
        const newStatus = record?.status + 1;

        updateStatus(id, newStatus);
        setIsCardFlip(false);
    };

    return (
        <div className={styles.root}>
            <div className={styles.status}>
                <StatusCircles status={record?.status} />
            </div>

            <FlipCard key={id} isCardFlip1={isCardFlip} frontText={value} backText={translationString} onFlip={() => setIsCardFlip(true)} />

            <div className={styles.actions}>
                {isCardFlip ? (
                    <>
                        <Button
                            content="Не помню"
                            className={styles.btn}
                            onClick={downStatus}
                        />

                        <Button content="Помню" className={styles.btn} onClick={upStatus} />
                    </>
                ) : (
                    <Button content="Перевернуть карточку" className={styles.btn} onClick={() => setIsCardFlip(true)} />
                )}
            </div>
        </div>
    );
}