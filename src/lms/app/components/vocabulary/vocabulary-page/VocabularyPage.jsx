import { useCallback, useState } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { useVocabulary } from 'shared/hooks/vocabularies';
import { Checkbox, Flex, Form, Icon, List, Select } from 'shared/ui-components';

import LexemeItem from 'lms/components/vocabulary/lexeme-item';
import VocabularyEditModal from 'lms/components/vocabulary/vocabulary-edit-modal';
import VocabularyPopover from 'lms/components/vocabulary/vocabulary-popover';
import VocabularyPreviewModal from 'lms/components/vocabulary/vocabulary-preview-modal';

export default function VocabularyPage({ match }) {
    const vocabularyId = match.params.vocabulary;
    const [vocabulary, actions] = useVocabulary(vocabularyId);
    const [currentLexeme, setCurrentLexeme] = useState(null);
    const [isEditModalOpen, toggleEditModalOpen] = useBoolean(false);
    const [isPreviewModalOpen, togglePreviewModalOpen] = useBoolean(false);
    const [user] =  useUser();
    const userId = user.id;

    const handleDeleteLexeme = useCallback(lexemeId => {
        return actions.deleteLexeme(vocabularyId, lexemeId);
    }, [actions, vocabularyId]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(vocabularyId, currentLexeme.id, data)
            .finally(() => toggleEditModalOpen(false));
    }, [actions, currentLexeme?.id, toggleEditModalOpen, vocabularyId]);

    if (!vocabulary) return <LoadingIndicator />;

    const { title, lexemes, numberOfLexemes } = vocabulary;
    const vocabularyTitle = `${title} (${numberOfLexemes})`;

    return (
        <Page className="Vocabulary">
            <Page.Content className="VocabularyPageContent">
                <Flex className="Vocabulary__header">
                    <Checkbox
                        checked={false}
                        onChange={() => console.log('check')}
                    />

                    <Form.Input
                        endDecorator={<Icon>search</Icon>}
                        placeholder="Поиск"
                        className="Vocabulary__search"
                        onChange={() => console.log('search')}
                    />

                    <VocabularyPopover
                        vocabularyId={vocabularyId}
                        numberOfLexemes={numberOfLexemes}
                        addLexeme={actions.addLexeme}
                    />

                    <Select
                        name='VocabularySelect'
                        className="Vocabulary__select"
                        defaultValue="my-vocabulary"
                        onChange={() => console.log('search')}
                    >
                        <Select.Option value="my-vocabulary">{vocabularyTitle}</Select.Option>
                        <Select.Option value="course">Course vocabulary</Select.Option>
                        <Select.Option value="extra">Extra vocabulary</Select.Option>
                    </Select>
                </Flex>

                <List className="Vocabulary__body">
                    {lexemes?.map(lexeme =>
                        <LexemeItem
                            key={lexeme.id}
                            userId={userId}
                            lexeme={lexeme}
                            handleDeleteLexeme={handleDeleteLexeme}
                            setCurrentLexeme={setCurrentLexeme}
                            toggleEditModalOpen={toggleEditModalOpen}
                            togglePreviewModalOpen={togglePreviewModalOpen}
                        />)}
                </List>

                {(currentLexeme && isEditModalOpen) && (
                    <VocabularyEditModal
                        id="vocabulary-edit-form"
                        lexeme={currentLexeme}
                        open={isEditModalOpen}
                        onClose={toggleEditModalOpen}
                        onSubmit={handleUpdateLexeme}
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