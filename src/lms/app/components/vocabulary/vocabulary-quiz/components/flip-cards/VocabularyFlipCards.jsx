import { useState } from 'react';

import { Button, FlipCard, StatusCircles } from 'shared/ui-components';

import styles from './VocabularyFlipCards.module.scss';

export default function VocabularyFlipCards({ lexeme, updateStatus }) {
    const [isCardFlip, setIsCardFlip] = useState(false);

    const { id, value, translations, record } = lexeme;
    const translationString = translations.join(', ');

    function downStatus() {
        const newStatus = record?.status - 1;

        updateStatus(id, newStatus);
        setIsCardFlip(false);
    }

    function upStatus() {
        const newStatus = record?.status + 1;

        updateStatus(id, newStatus);
        setIsCardFlip(false);
    }

    return (
        <div className={styles.root}>
            <div className={styles.status}>
                <StatusCircles status={record?.status} />
            </div>

            <FlipCard
                key={id}
                isCardFlip1={isCardFlip}
                frontText={value}
                backText={translationString}
                onFlip={() => setIsCardFlip(true)}
            />

            <div className={styles.actions}>
                {isCardFlip ? (
                    <>
                        <Button
                            className={styles.btn}
                            content="Не помню"
                            color="danger"
                            onClick={downStatus}
                        />

                        <Button
                            className={styles.btn}
                            content="Помню"
                            color="success"
                            onClick={upStatus}
                        />
                    </>
                ) : (
                    <Button
                        className={styles.btn}
                        content="Перевернуть карточку"
                        onClick={() => setIsCardFlip(true)}
                    />
                )}
            </div>
        </div>
    );
}