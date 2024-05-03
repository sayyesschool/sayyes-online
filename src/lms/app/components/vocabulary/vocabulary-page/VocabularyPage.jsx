import { useCallback, useState } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { useVocabulary } from 'shared/hooks/vocabularies';
import { getWordEnding } from 'shared/utils/format';

import VocabularyAddButton from 'lms/components/vocabulary/vocabulary-add-button';
import VocabularyEditModal from 'lms/components/vocabulary/vocabulary-edit-modal';
import VocabularyLexemes from 'lms/components/vocabulary/vocabulary-lexemes';
import VocabularyPreviewModal from 'lms/components/vocabulary/vocabulary-preview-modal';

import styles from './VocabularyPage.module.scss';

export default function VocabularyPage({ match }) {
    const [vocabulary, actions] = useVocabulary(match.params.vocabulary);
    const [user] =  useUser();

    const [currentLexeme, setCurrentLexeme] = useState(null);
    const [isEditModalOpen, toggleEditModalOpen] = useBoolean(false);
    const [isPreviewModalOpen, togglePreviewModalOpen] = useBoolean(false);

    const vocabularyId = vocabulary?.id;

    const handleAddLexeme = useCallback(data => {
        return actions.addLexeme(vocabularyId, data)
            .finally(() => toggleEditModalOpen(false));
    }, [actions, vocabularyId, toggleEditModalOpen]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(vocabularyId, currentLexeme.id, data)
            .finally(() => toggleEditModalOpen(false));
    }, [actions, vocabularyId, currentLexeme?.id, toggleEditModalOpen]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        return actions.deleteLexeme(vocabularyId, lexemeId);
    }, [actions, vocabularyId]);

    const handleEditLexeme = useCallback(lexeme => {
        setCurrentLexeme(lexeme);
        toggleEditModalOpen(true);
    }, [toggleEditModalOpen]);

    const handleSelectLexeme = useCallback(lexeme => {

    }, [toggleEditModalOpen]);

    const handleViewLexeme = useCallback(lexeme => {
        setCurrentLexeme(lexeme);
        togglePreviewModalOpen(true);
    }, [togglePreviewModalOpen]);

    const handleUpdateLexemeStatus = useCallback((lexeme, status) => {
        return actions.updateLexemeStatus(lexeme.id, status);
    }, [actions]);

    if (!vocabulary) return <LoadingIndicator />;

    const { title, numberOfLexemes } = vocabulary;
    const pageTitle = `${title} (${numberOfLexemes})`;
    const pageDescription = `${vocabulary.numberOfLexemes} ${getWordEnding('слов', vocabulary.numberOfLexemes, ['о', 'а', ''])}`;

    return (
        <Page className={styles.root}>
            <Page.Header
                title={vocabulary.title}
                description={pageDescription}
                actions={[
                    <VocabularyAddButton
                        key="add"
                        onAddLexeme={handleAddLexeme}
                    />
                ]}
            />

            <Page.Content>
                <Page.Section compact>
                    <VocabularyLexemes
                        userId={user.id}
                        vocabulary={vocabulary}
                        onEditLexeme={handleEditLexeme}
                        onSelectLexeme={handleSelectLexeme}
                        onViewLexeme={handleViewLexeme}
                        onDeleteLexeme={handleDeleteLexeme}
                        onUpdateLexemeStatus={handleUpdateLexemeStatus}
                    />
                </Page.Section>

                {(currentLexeme && isEditModalOpen) && (
                    <VocabularyEditModal
                        id="vocabulary-edit-form"
                        lexeme={currentLexeme}
                        open={isEditModalOpen}
                        onSubmit={handleUpdateLexeme}
                        onClose={toggleEditModalOpen}
                    />
                )}

                {(currentLexeme && isPreviewModalOpen) && (
                    <VocabularyPreviewModal
                        lexeme={currentLexeme}
                        open={isPreviewModalOpen}
                        onClose={togglePreviewModalOpen}
                    />
                )}
            </Page.Content>
        </Page>
    );
}