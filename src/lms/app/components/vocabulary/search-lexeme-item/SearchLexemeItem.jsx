import { useCallback } from 'react';

import { Flex, IconButton, Text } from 'shared/ui-components';

import styles from './SearchLexemeItem.module.scss';

const stopPropagation = e => {
    e.stopPropagation();
};

export default function SearchLexemeItem({ option, lexemes: mylexemes, addLexeme, deleteLexeme }) {
    const lexemeAlreadyExist = mylexemes.find(lexeme => lexeme.id === option.id);
    const translations = option.translations.join(', ');

    const onAddBtn = useCallback(e => {
        stopPropagation(e);
        return addLexeme({ lexemeId: option.id });
    }, [addLexeme, option.id]);

    const onRemoveBtn = useCallback(e => {
        stopPropagation(e);
        return deleteLexeme(option.id);
    }, [deleteLexeme, option.id]);

    return (
        <Flex className={styles.root} onClick={stopPropagation}>
            <div className={styles.text}>
                <Text color="primary">{option.value}</Text>
                <Text content="-" />
                <Text >{translations}</Text>
            </div>

            {lexemeAlreadyExist ? (
                <IconButton icon="close" title="Убрать слово" onClick={onRemoveBtn} />
            ) : (
                <IconButton icon="add" title="Добавить слово" onClick={onAddBtn} />
            )}
        </Flex>
    );
}