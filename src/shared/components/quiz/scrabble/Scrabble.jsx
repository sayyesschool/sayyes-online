import { useCallback, useEffect, useState } from 'react';

import { sessionCardsCount, shuffleAndFilter, shuffleArr } from '@/shared/libs/quiz';
import StatusCircles from 'shared/components/status-circles';
import { Button, Stepper } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './Scrabble.module.scss';

export const getData = data => shuffleAndFilter(data);

const displayChar = char => (char === ' ' ? '_' : char);

const getShuffleLetters = word => {
    if (word.length < 2) return word;

    let shuffled;

    do {
        shuffled = shuffleArr(word.split('')).join('');
    } while (shuffled === word);

    return shuffled;
};

export default function Scrabble({
    item,
    itemIndex,
    numberOfItems,
    updateStatus
}) {
    const { id, value, translation, record } = item;
    const [shuffledWord, setShuffledWord] = useState(getShuffleLetters(value));
    const [userInput, setUserInput] = useState(Array(value.length).fill(null));
    const [availableChars, setAvailableChars] = useState(
        shuffledWord.split('').map((char, index) => ({ char, id: `${char}-${index}`, disabled: false }))
    );
    const isNextDisabled = availableChars.some(char => !char.disabled);
    const stepsCount = sessionCardsCount(numberOfItems);

    const resetGame = useCallback(() => {
        const shuffled = getShuffleLetters(value);
        setShuffledWord(shuffled);
        setUserInput(Array(value.length).fill(null));

        setAvailableChars(
            shuffled
                .split('')
                .map((char, index) => ({ char, id: `${char}-${index}`, disabled: false }))
        );
    }, [value]);

    const next = useCallback(() => {
        const oldStatus = record?.status;
        const newStatus =
          userInput.map(char => char?.char).join('') === value
              ? oldStatus + 1
              : oldStatus - 1;

        updateStatus(id, newStatus);
    }, [id, record?.status, updateStatus, userInput, value]);

    const handleKeyPress = useCallback(event => {
        const { key } = event;

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

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        resetGame();
    }, [value, resetGame]);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <StatusCircles status={record?.status} />
            </div>

            <h1 className={styles.value}>{translation}</h1>

            <div className={styles.content}>
                <div className={styles.availableChars}>
                    {availableChars.map(charObj => {
                        const onClick = () => handleClickAvailable(charObj);

                        return (
                            <button
                                key={charObj.id}
                                disabled={charObj.disabled}
                                className={styles.availableChar}
                                onClick={onClick}
                            >
                                {displayChar(charObj.char)}
                            </button>
                        );
                    })}
                </div>

                <div className={styles.userInputChars}>
                    {userInput.map((charObj, index) => {
                        const onClick = () => charObj && handleClickChar(charObj, index);

                        return (
                            <button
                                key={index}
                                className={cn(styles.userInputChar, { [styles.active]: charObj })}
                                onClick={onClick}
                            >
                                {charObj ? displayChar(charObj.char) : ''}
                            </button>
                        );
                    })}
                </div>

                <div className={styles.resetGame} onClick={resetGame}>
                    сбросить
                </div>
            </div>;

            <Stepper
                steps={Array.from({ length: stepsCount }).map((_, index) => ({
                    active: index === itemIndex,
                    orientation: 'vertical',
                    indicator: (
                        <span
                            className={cn(
                                styles.indicator,
                                index === itemIndex && styles.active,
                                index < itemIndex && styles.prev
                            )}
                        />
                    )
                }))}
                size="sm"
            />

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