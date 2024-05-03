import { List } from 'shared/ui-components';

import LexemeItem from 'lms/components/vocabulary/lexeme-item';

import styles from './LexemesList.module.scss';

export default function LexemesList({
    lexemes = [],
    userId,
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
                    userId={userId}
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