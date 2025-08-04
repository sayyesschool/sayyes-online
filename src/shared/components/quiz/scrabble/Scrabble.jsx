import { useCallback, useEffect, useState } from 'react';

import { shuffleAndFilter, shuffleLetters } from 'shared/libs/quiz';
import { Button, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import styles from './Scrabble.module.scss';

export const getData = data => shuffleAndFilter(data);

const groupByChar = str => {
    const map = new Map();

    for (const char of str) {
        map.set(char, (map.get(char) || 0) + 1);
    }

    return [...map.entries()].map(([char, count]) => ({
        char,
        count,
        disabled: false
    }));
};

const groupSelectedChars = (selectedChars, value) => {
    const lengths = value.split(' ').map(word => word.length);
    let pointer = 0;

    return lengths.map(len => {
        const slice = selectedChars.slice(pointer, pointer + len);
        pointer += len;

        return slice;
    });
};

export default function Scrabble({ item, updateStatus }) {
    const { id, value, translation, status } = item;

    const [selectedChars, setSelectedChars] = useState([]);
    const [availableChars, setAvailableChars] = useState([]);

    const isResetDisabled = selectedChars.every(c => c === null);
    const isNextDisabled = availableChars.some(c => !c.disabled);

    const groupedSelectedChars = groupSelectedChars(selectedChars, value);

    const reset = useCallback(() => {
        const shuffled = shuffleLetters(value.replace(/ /g, ''));

        setSelectedChars(Array(shuffled.length).fill(null));
        setAvailableChars(groupByChar(shuffled));
    }, [value]);

    const next = useCallback(() => {
        const trimed = value.replace(/ /g, '');
        const assembled = selectedChars.map(c => c?.char).join('');
        const newStatus = assembled === trimed ? status + 1 : status - 1;

        updateStatus([{ id, newStatus }]);
    }, [id, status, updateStatus, selectedChars, value]);

    const handleSelect = useCallback(char => {
        const index = selectedChars.findIndex(c => c === null);

        if (index === -1) return;

        setSelectedChars(prev => {
            const next = [...prev];
            next[index] = { char };

            return next;
        });

        setAvailableChars(prev =>
            prev.map(c =>
                c.char === char
                    ? { ...c, count: c.count - 1, disabled: c.count - 1 <= 0 }
                    : c
            )
        );
    }, [selectedChars]);

    const handleDeselect = useCallback((charObj, index) => {
        if (!charObj) return;

        setSelectedChars(prev => {
            const next = [...prev];
            next[index] = null;

            return next;
        });

        setAvailableChars(prev =>
            prev.map(c =>
                c.char === charObj.char
                    ? { ...c, count: c.count + 1, disabled: false }
                    : c
            )
        );
    }, []);

    useEffect(() => {
        reset();
    }, [reset]);

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Text
                    type="h2"
                    content={translation}
                    end={
                        <LexemeStatus
                            level={status} tooltipPlacement="right"
                            readOnly
                        />
                    }
                />

                <div className={styles.selectedChars}>
                    {groupedSelectedChars.map((wordGroup, wordIndex) => {
                        const groupOffset = groupedSelectedChars
                            .slice(0, wordIndex)
                            .reduce((sum, g) => sum + g.length, 0);

                        return (
                            <div key={wordIndex} className={styles.wordRow}>
                                {wordGroup.map((charObj, index) => (
                                    <Button
                                        key={index}
                                        className={styles.selectedChar}
                                        content={charObj ? charObj.char : ''}
                                        color="neutral"
                                        size="lg"
                                        variant="outlined"
                                        disabled={!charObj}
                                        onClick={() => handleDeselect(charObj, groupOffset + index)}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>

                <div className={styles.availableChars}>
                    {availableChars.map(({ char, count, disabled }, index) => (
                        <Button
                            key={`${char}-${count}-${index}`}
                            className={styles.availableChar}
                            color="neutral"
                            variant="soft"
                            disabled={disabled}
                            onClick={() => handleSelect(char)}
                        >
                            <span>{char}</span>
                            {count > 1 && <span>{count}</span>}
                        </Button>
                    ))}
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