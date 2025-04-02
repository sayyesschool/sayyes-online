import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import VocabulariesGrid from 'shared/components/vocabularies-grid';
import VocabularyCard from 'shared/components/vocabulary-card';
import { useUser } from 'shared/hooks/user';
import { useVocabularies, useVocabulary } from 'shared/hooks/vocabularies';
import { Flex, PopoverButton } from 'shared/ui-components';

import VocabularyForm from 'lms/components/vocabulary/vocabulary-form';
import VocabularySimpleForm from 'lms/components/vocabulary/vocabulary-simple-form';

export default function VocabulariesPage() {
    const [user] = useUser();
    const [userVocabulary] = useVocabulary('my');
    const [vocabularies, actions] = useVocabularies();

    const [currentVocabulary, setCurrentVocabulary] = useState(null);

    const numberOfVocabularies = vocabularies?.length;

    const handleAddVocabulary = useCallback(data => {
        return actions.createVocabulary({ learnerId: user.id, ...data });
    }, [actions, user.id]);

    const handleUpdateVocabulary = useCallback((vocabularyId, data) => {
        return actions.updateVocabulary(vocabularyId, data)
            .then(() => setCurrentVocabulary(null));
    }, [actions]);

    const handleDeleteVocabulary = useCallback(vocabularyId => {
        return actions.deleteVocabulary(vocabularyId);
    }, [actions]);

    const handleEditVocabulary = useCallback(vocabulary => {
        setCurrentVocabulary(vocabulary);
    }, []);

    const handleCloseFormDialog = useCallback(() => {
        setCurrentVocabulary(null);
    }, []);

    if (!vocabularies) return <LoadingIndicator />;

    return (
        <Page className="VocabulariesPage" layout="narrow">
            <Page.Header
                title="Словари"
                actions={[
                    <PopoverButton
                        key="add-vocabulary"
                        content="Добавить словарь"
                        color="primary"
                    >
                        <VocabularySimpleForm
                            numberOfVocabularies={numberOfVocabularies}
                            onSubmit={handleAddVocabulary}
                        />
                    </PopoverButton>
                ]}
            />

            <Page.Content>
                <Flex gap="medium" column>
                    {userVocabulary &&
                        <VocabularyCard
                            href={`vocabulary/${userVocabulary.id}`}
                            vocabulary={userVocabulary}
                            orientation="horizontal"
                            readOnly
                        />
                    }

                    <VocabulariesGrid
                        href="vocabulary"
                        vocabularies={vocabularies}
                        onEditVocabulary={handleEditVocabulary}
                        onDeleteVocabulary={handleDeleteVocabulary}
                    />
                </Flex>
            </Page.Content>

            {currentVocabulary && (
                <FormDialog
                    title="Редактирование"
                    open={!!currentVocabulary}
                    onClose={handleCloseFormDialog}
                >
                    <VocabularyForm
                        id="vocabulary-edit-form"
                        vocabulary={currentVocabulary}
                        submit={handleUpdateVocabulary}
                    />
                </FormDialog>
            )}
        </Page>
    );
}