import { useCallback, useEffect, useState } from 'react';

import { shuffleAndFilter, shuffleLetters } from 'shared/libs/quiz';
import { Button, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import styles from './Scrabble.module.scss';

export const getData = data => shuffleAndFilter(data);

const displayChar = char => (char === ' ' ? '_' : char.toLowerCase());

export default function Scrabble({ item, updateStatus }) {
    const { id, value, translation, status } = item;

    const [shuffledWord, setShuffledWord] = useState(shuffleLetters(value));
    const [selectedChars, setSelectedChars] = useState(Array(value.length).fill(null));
    const [availableChars, setAvailableChars] = useState(
        shuffledWord.split('').map((char, index) => ({
            id: `${char}-${index}`,
            char,
            disabled: false
        }))
    );

    const reset = useCallback(() => {
        const shuffled = shuffleLetters(value);

        setShuffledWord(shuffled);
        setSelectedChars(Array(value.length).fill(null));
        setAvailableChars(
            shuffled.split('').map((char, index) => ({
                char,
                id: `${char}-${index}`,
                disabled: false
            }))
        );
    }, [value]);

    const next = useCallback(() => {
        const newStatus =
          selectedChars.map(char => char?.char).join('') === value
              ? status + 1
              : status - 1;

        updateStatus([{ id, newStatus }]);
    }, [id, status, updateStatus, selectedChars, value]);

    const handleKeyPress = useCallback(({ key }) => {
        if (key === 'Backspace') {
            setSelectedChars(prev => {
                const lastCharIndex = prev.findLastIndex(char => char !== null);

                if (lastCharIndex !== -1) {
                    const lastChar = prev[lastCharIndex];

                    setAvailableChars(chars =>
                        chars.map(char =>
                            char.id === lastChar.id ? { ...char, disabled: false } : char
                        )
                    );

                    const newUserInput = [...prev];
                    newUserInput[lastCharIndex] = null;

                    return newUserInput;
                }

                return prev;
            });
        } else {
            const charIndex = availableChars.findIndex(char => char.char === key && !char.disabled);
            const firstEmptyIndex = selectedChars.findIndex(char => char === null);

            if (charIndex === -1 || firstEmptyIndex === -1) return;

            setSelectedChars(prev => {
                const newUserInput = [...prev];
                newUserInput[firstEmptyIndex] = availableChars[charIndex];

                return newUserInput;
            });

            setAvailableChars(prev =>
                prev.map((char, index) =>
                    index === charIndex ? { ...char, disabled: true } : char
                )
            );
        }
    }, [availableChars, selectedChars]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        reset();
    }, [value, reset]);

    const handleClickSelectedChar = useCallback((charObj, index) => {
        setSelectedChars(prev => {
            const next = [...prev];

            next[index] = null;

            return next;
        });

        setAvailableChars(prev =>
            prev.map(char =>
                char.id === charObj.id ? { ...char, disabled: false } : char
            )
        );
    }, []);

    const handleClickAvailableChar = useCallback(charObj => {
        const charIndex = availableChars.findIndex(char => char.id === charObj.id && !char.disabled);

        if (charIndex === -1) return;

        const firstEmptyIndex = selectedChars.findIndex(char => char === null);

        if (firstEmptyIndex === -1) return;

        setSelectedChars(prev => {
            const next = [...prev];

            next[firstEmptyIndex] = availableChars[charIndex];

            return next;
        });

        setAvailableChars(prev =>
            prev.map((char, index) =>
                index === charIndex ? { ...char, disabled: true } : char
            )
        );
    }, [availableChars, selectedChars]);

    const isResetDisabled = selectedChars.every(char => char === null);
    const isNextDisabled = availableChars.some(char => !char.disabled);

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Text
                    type="h2"
                    content={translation}
                    end={
                        <LexemeStatus
                            level={status}
                            tooltipPlacement="right"
                            readOnly
                        />
                    }
                />

                <div className={styles.selectedChars}>
                    {selectedChars.map((charObj, index) =>
                        <Button
                            key={index}
                            className={styles.selectedChar}
                            content={charObj ? displayChar(charObj.char) : ''}
                            color="neutral"
                            size="lg"
                            variant="outlined"
                            disabled={!charObj}
                            onClick={charObj && (() => handleClickSelectedChar(charObj, index))}
                        />
                    )}
                </div>

                <div className={styles.availableChars}>
                    {availableChars.map(charObj =>
                        <Button
                            key={charObj.id}
                            className={styles.availableChar}
                            content={displayChar(charObj.char)}
                            color="neutral"
                            variant="soft"
                            disabled={charObj.disabled}
                            onClick={() => handleClickAvailableChar(charObj)}
                        />
                    )}
                </div>

                <Button
                    content="Сбросить"
                    color="danger"
                    size="small"
                    variant="plain"
                    disabled={isResetDisabled}
                    onClick={reset}
                />
            </div>

            <div className={styles.actions}>
                <Button
                    className={styles.nextButton}
                    content="Далее"
                    disabled={isNextDisabled}
                    onClick={next}
                />
            </div>
        </div>
    );
}