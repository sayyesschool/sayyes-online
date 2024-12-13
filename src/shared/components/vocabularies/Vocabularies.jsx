import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import { PopoverButton } from 'shared/ui-components';

import VocabulariesGrid from 'lms/components/vocabulary/vocabularies-grid';
import VocabularyForm from 'lms/components/vocabulary/vocabulary-form';
import VocabularySimpleForm from 'lms/components/vocabulary/vocabulary-simple-form';

export default function Vocabularies({ user, vocabularies, actions }) {
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
                            onAddVocabulary={handleAddVocabulary}
                        />
                    </PopoverButton>
                ]}
            />

            <Page.Content>
                <VocabulariesGrid
                    vocabularies={vocabularies}
                    onEditVocabulary={handleEditVocabulary}
                    onDeleteVocabulary={handleDeleteVocabulary}
                />
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