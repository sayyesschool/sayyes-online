import LexemeItem from 'shared/components/lexeme-item';
import { List } from 'shared/ui-components';

import styles from './LexemesList.module.scss';

export default function LexemesList({
    inline,
    user,
    lexemes = [],
    selectedLexemeIds,
    onUnapprove,
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
                    inline={inline}
                    user={user}
                    lexeme={lexeme}
                    selectedLexemeIds={selectedLexemeIds}
                    onUnapprove={onUnapprove}
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