import LexemeItem from 'shared/components/lexeme-item';
import { List } from 'shared/ui-components';

import styles from './LexemesList.module.scss';

export default function LexemesList({
    user,
    lexemes = [],
    readOnly,
    selectedLexemeIds,
    onApprove,
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
                    user={user}
                    lexeme={lexeme}
                    readOnly={readOnly}
                    selectedLexemeIds={selectedLexemeIds}
                    onApprove={onApprove}
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