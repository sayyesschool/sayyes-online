import LexemeItem from 'shared/components/lexeme-item';
import { List } from 'shared/ui-components';

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