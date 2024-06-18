import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import { useBoolean } from 'shared/hooks/state';
import { useVocabularyActions } from 'shared/hooks/vocabularies';
import { Checkbox, Dialog, PopoverButton } from 'shared/ui-components';

import LexemeForm from 'lms/components/vocabulary/lexeme-form';
import LexemeSimpleForm from 'lms/components/vocabulary/lexeme-simple-form';
import LexemeView from 'lms/components/vocabulary/lexeme-view';
import LexemesList from 'lms/components/vocabulary/lexemes-list';
import VocabularySearch from 'lms/components/vocabulary/vocabulary-search';

import styles from './VocabularyLexemes.module.scss';

const filters = {
    all: () => true,
    new: lexeme => lexeme.record?.status === 0,
    learning: lexeme => lexeme.record?.status > 0 && lexeme.record?.status < 4,
    learned: lexeme => lexeme.record?.status === 4
};

export default function VocabularyLexemes({
    vocabulary
}) {
    const actions = useVocabularyActions();

    const [currentLexemeId, setCurrentLexemeId] = useState(null);
    const [selectedLexemeIds, setSelectedLexemeIds] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isEditModalOpen, toggleEditModalOpen] = useBoolean(false);
    const [isViewModalOpen, toggleViewModalOpen] = useBoolean(false);

    const vocabularyId = vocabulary?.id;

    const handleAddLexeme = useCallback(data => {
        return actions.addLexeme(vocabularyId, data)
            .finally(() => toggleEditModalOpen(false));
    }, [actions, vocabularyId, toggleEditModalOpen]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(vocabularyId, currentLexemeId, data)
            .finally(() => toggleEditModalOpen(false));
    }, [actions, vocabularyId, currentLexemeId, toggleEditModalOpen]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        return actions.deleteLexeme(vocabularyId, lexemeId);
    }, [actions, vocabularyId]);

    const handleEditLexeme = useCallback(lexemeId => {
        setCurrentLexemeId(lexemeId);
        toggleEditModalOpen(true);
    }, [toggleEditModalOpen]);

    const handleSelectLexeme = useCallback(lexemeId => {
        setSelectedLexemeIds(ids => {
            const isSelected = ids.includes(lexemeId);

            return isSelected ?
                ids.filter(id => id !== lexemeId) :
                ids.concat(lexemeId);
        });
    }, []);

    const handleViewLexeme = useCallback(lexemeId => {
        setCurrentLexemeId(lexemeId);
        toggleViewModalOpen(true);
    }, [toggleViewModalOpen]);

    const handleUpdateLexemeStatus = useCallback((lexemeId, status) => {
        return actions.updateLexemeStatus(lexemeId, status);
    }, [actions]);

    const lexemes = vocabulary.lexemes.filter(filters[filter]);
    const currentLexeme = lexemes.find(lexeme => lexeme.id === currentLexemeId);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Checkbox
                    checked={false}
                    onChange={() => console.log('check')}
                />

                <VocabularySearch
                    className={styles.search}
                    lexemes={lexemes}
                    onAddLexeme={handleAddLexeme}
                />

                <PopoverButton
                    content="Добавить слово"
                    color="primary"
                >
                    <LexemeSimpleForm
                        numberOfLexemes={vocabulary.numberOfLexemes}
                        onSubmit={handleAddLexeme}
                    />
                </PopoverButton>
            </div>

            <div className={styles.body}>
                <LexemesList
                    lexemes={lexemes}
                    onViewLexeme={handleViewLexeme}
                    onEditLexeme={handleEditLexeme}
                    onSelectLexeme={handleSelectLexeme}
                    onDeleteLexeme={handleDeleteLexeme}
                    onUpdateLexemeStatus={handleUpdateLexemeStatus}
                />
            </div>

            {(currentLexeme && isEditModalOpen) &&
                <FormDialog
                    title="Редактирование"
                    open={isEditModalOpen}
                    onClose={toggleEditModalOpen}
                >
                    <LexemeForm
                        id="lexeme-edit-form"
                        lexeme={currentLexeme}
                        onSubmit={handleUpdateLexeme}
                    />
                </FormDialog>
            }

            {(currentLexeme && isViewModalOpen) &&
                <Dialog
                    open={isViewModalOpen}
                    onClose={toggleViewModalOpen}
                >
                    <LexemeView
                        lexeme={currentLexeme}
                        onStatusUpdate={handleUpdateLexemeStatus}
                    />
                </Dialog>
            }
        </div>
    );
}