import LexemeItem from 'shared/components/lexeme-item';
import { List } from 'shared/ui-components';

import styles from './LexemesList.module.scss';

export default function LexemesList({
    lexemes = [],
    selectedLexemeIds,
    onViewLexeme,
    getActionButtons,
    onSelectLexeme
}) {
    return (
        <List className={styles.root}>
            {lexemes?.map(lexeme => {
                const actionButtons = getActionButtons(lexeme);

                return (
                    <LexemeItem
                        key={lexeme.id}
                        lexeme={lexeme}
                        actionButtons={actionButtons}
                        selectedLexemeIds={selectedLexemeIds}
                        onView={onViewLexeme}
                        onSelect={onSelectLexeme}
                    />
                );
            }
            )}
        </List>
    );
}