import { useCallback, useEffect, useState } from 'react';

import { shuffleAndFilter, shuffleLetters } from 'shared/libs/quiz';
import { Button, Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import styles from './Scrabble.module.scss';

export const getData = data => shuffleAndFilter(data);

const displayChar = char => (char === ' ' ? '_' : char);

// TODO добавить обработку регистра

export default function Scrabble({ item, updateStatus }) {
    const { id, value, translation, status } = item;

    const [shuffledWord, setShuffledWord] = useState(shuffleLetters(value));
    const [userInput, setUserInput] = useState(Array(value.length).fill(null));
    const [availableChars, setAvailableChars] = useState(
        shuffledWord.split('').map((char, index) => ({ char, id: `${char}-${index}`, disabled: false }))
    );
    const isNextDisabled = availableChars.some(char => !char.disabled);

    const reset = useCallback(() => {
        const shuffled = shuffleLetters(value);
        setShuffledWord(shuffled);
        setUserInput(Array(value.length).fill(null));

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
          userInput.map(char => char?.char).join('') === value
              ? status + 1
              : status - 1;

        updateStatus(id, newStatus);
    }, [id, status, updateStatus, userInput, value]);

    const handleKeyPress = useCallback(({ key }) => {
        if (key === 'Backspace') {
            setUserInput(prev => {
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
            const firstEmptyIndex = userInput.findIndex(char => char === null);

            if (charIndex === -1 || firstEmptyIndex === -1) return;

            setUserInput(prev => {
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
    }, [availableChars, userInput]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        reset();
    }, [value, reset]);

    const handleClickChar = useCallback((charObj, index) => {
        setUserInput(prev => {
            const newUserInput = [...prev];
            newUserInput[index] = null;

            return newUserInput;
        });

        setAvailableChars(chars =>
            chars.map(char =>
                char.id === charObj.id ? { ...char, disabled: false } : char
            )
        );
    }, []);

    const handleClickAvailable = useCallback(charObj => {
        const charIndex = availableChars.findIndex(char => char.id === charObj.id && !char.disabled);

        if (charIndex === -1) return;

        const firstEmptyIndex = userInput.findIndex(char => char === null);

        if (firstEmptyIndex !== -1) {
            setUserInput(prev => {
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
    }, [availableChars, userInput]);

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

                <div className={styles.userInputChars}>
                    {userInput.map((charObj, index) => {
                        const onClick = () => charObj && handleClickChar(charObj, index);

                        return (
                            <Button
                                key={index}
                                className={cn(styles.userInputChar, {
                                    [styles.active]: charObj
                                })}
                                color="neutral"
                                size="lg"
                                variant="outlined"
                                onClick={onClick}
                            >
                                {charObj ? displayChar(charObj.char) : ''}
                            </Button>
                        );
                    })}
                </div>

                <div className={styles.availableChars}>
                    {availableChars.map(charObj => {
                        const onClick = () => handleClickAvailable(charObj);

                        return (
                            <Button
                                key={charObj.id}
                                className={styles.availableChar}
                                color="neutral"
                                variant="soft"
                                disabled={charObj.disabled}
                                onClick={onClick}
                            >
                                {displayChar(charObj.char)}
                            </Button>
                        );
                    })}
                </div>

                <Button
                    content="Сбросить"
                    color="danger"
                    size="small"
                    variant="plain"
                    onClick={reset}
                />
            </div>

            <div className={styles.actions}>
                <Button
                    className={styles.button}
                    content="Далее"
                    disabled={isNextDisabled}
                    onClick={next}
                />
            </div>
        </div>
    );
}