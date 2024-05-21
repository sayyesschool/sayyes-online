import { List } from 'shared/ui-components';

import LexemeItem from 'lms/components/vocabulary/lexeme-item';

import styles from './LexemesList.module.scss';

export default function LexemesList({
    lexemes = [],
    onViewLexeme,
    onEditLexeme,
    onSelectLexeme,
    onDeleteLexeme,
    onUpdateLexemeStatus
}) {
    return (
        <List className={styles.root}>
            {lexemes?.map(lexeme =>
                <LexemeItem
                    key={lexeme.id}
                    lexeme={lexeme}
                    onView={onViewLexeme}
                    onEdit={onEditLexeme}
                    onSelect={onSelectLexeme}
                    onDelete={onDeleteLexeme}
                    onStatusUpdate={onUpdateLexemeStatus}
                />
            )}
        </List>
    );
}