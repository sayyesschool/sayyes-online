import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import VocabulariesGrid from 'shared/components/vocabularies-grid';
import { useUser } from 'shared/hooks/user';
import { useVocabularies } from 'shared/hooks/vocabularies';
import { PopoverButton } from 'shared/ui-components';

import VocabularyForm from 'lms/components/vocabulary/vocabulary-form';
import VocabularySimpleForm from 'lms/components/vocabulary/vocabulary-simple-form';

export default function VocabulariesPage() {
    const [user] = useUser();
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

    if (!vocabularies) return <LoadingIndicator fullscreen />;

    return (
        <Page className="VocabulariesPage" layout="narrow">
            <Page.Header
                title="Словари"
                actions={[
                    <PopoverButton
                        key="new-vocabulary"
                        content="Новый словарь"
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