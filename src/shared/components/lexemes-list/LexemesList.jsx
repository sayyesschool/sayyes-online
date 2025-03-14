import LexemeItem from 'shared/components/lexeme-item';
import { List } from 'shared/ui-components';

import styles from './LexemesList.module.scss';

export default function LexemesList({
    lexemes = [],
    selectedLexemeIds,
    renderLexemeActions,
    onViewLexeme,
    onSelectLexeme
}) {
    return (
        <List className={styles.root}>
            {lexemes?.map(lexeme =>
                <LexemeItem
                    key={lexeme.id}
                    lexeme={lexeme}
                    actions={renderLexemeActions(lexeme)}
                    selected={selectedLexemeIds?.includes(lexeme.id)}
                    onView={onViewLexeme}
                    onSelect={onSelectLexeme}
                />
            )}
        </List>
    );
}