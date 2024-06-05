import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useUser } from 'shared/hooks/user';
import { useVocabularies } from 'shared/hooks/vocabularies';
import { PopoverButton } from 'shared/ui-components';

import VocabulariesGrid from 'lms/components/vocabulary/vocabularies-grid';
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

    const handleDeleteVocabulary = useCallback(vocabularyId => {
        return actions.deleteVocabulary(vocabularyId);
    }, [actions]);

    const handleUpdateVocabulary = useCallback((vocabularyId, data) => {
        return actions
            .updateVocabulary(vocabularyId, data)
            .then(() => onCloseFormModal());
    }, [actions]);

    const onCloseFormModal = () => {
        return setCurrentVocabulary(null);
    };

    if (!vocabularies) return <LoadingIndicator />;

    return (
        <Page className="VocabulariesPage">
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
                    setCurrentVocabulary={setCurrentVocabulary}
                    onDeleteVocabulary={handleDeleteVocabulary}
                />
            </Page.Content>

            {currentVocabulary && (
                <FormDialog
                    title="Редактирование"
                    open={!!currentVocabulary}
                    onClose={onCloseFormModal}
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