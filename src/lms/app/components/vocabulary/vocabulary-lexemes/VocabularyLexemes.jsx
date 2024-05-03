import { useState } from 'react';

import { Checkbox, Form, Icon, Select } from 'shared/ui-components';

import LexemesList from 'lms/components/vocabulary/lexemes-list';

import styles from './VocabularyLexemes.module.scss';

const filters = {
    all: () => true,
    new: lexeme => lexeme.data?.status === 0,
    learning: lexeme => lexeme.data?.status > 0 && lexeme.data?.status < 4,
    learned: lexeme => lexeme.data?.status === 4
};

export default function VocabularyLexemes({
    userId,
    vocabulary,
    onViewLexeme,
    onEditLexeme,
    onSelectLexeme,
    onDeleteLexeme,
    onUpdateLexemeStatus
}) {
    const [filter, setFilter] = useState('all');

    const lexemes = vocabulary.lexemes.filter(filters[filter]);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Checkbox
                    checked={false}
                    onChange={() => console.log('check')}
                />

                <Form.Input
                    endDecorator={<Icon>search</Icon>}
                    placeholder="Поиск"
                    className={styles.search}
                    onChange={() => console.log('search')}
                />

                <Select
                    className={styles.select}
                    defaultValue="all"
                    options={[
                        { value: 'all', content: 'Все слова' },
                        { value: 'new', content: 'Новые' },
                        { value: 'learning', content: 'Изучаемые' },
                        { value: 'learned', content: 'Изученные' }
                    ]}
                    onChange={(event, value) => setFilter(value)}
                />
            </div>

            <LexemesList
                userId={userId}
                lexemes={lexemes}
                onViewLexeme={onViewLexeme}
                onEditLexeme={onEditLexeme}
                onSelectLexeme={onSelectLexeme}
                onDeleteLexeme={onDeleteLexeme}
                onUpdateLexemeStatus={onUpdateLexemeStatus}
            />
        </div>
    );
}