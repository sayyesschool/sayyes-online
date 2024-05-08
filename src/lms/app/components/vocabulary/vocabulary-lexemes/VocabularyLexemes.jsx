import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { useVocabularyActions } from 'shared/hooks/vocabularies';
import { Checkbox, Dialog, Icon, Input, Select } from 'shared/ui-components';

import LexemeAddButton from 'lms/components/vocabulary/lexeme-add-button';
import LexemeForm from 'lms/components/vocabulary/lexeme-form';
import LexemeView from 'lms/components/vocabulary/lexeme-view';
import LexemesList from 'lms/components/vocabulary/lexemes-list';

import styles from './VocabularyLexemes.module.scss';

const filters = {
    all: () => true,
    new: lexeme => lexeme.data?.status === 0,
    learning: lexeme => lexeme.data?.status > 0 && lexeme.data?.status < 4,
    learned: lexeme => lexeme.data?.status === 4
};

export default function VocabularyLexemes({
    vocabulary
}) {
    const actions = useVocabularyActions();
    const [user] =  useUser();

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

                <Input
                    start={<Icon>search</Icon>}
                    placeholder="Поиск"
                    className={styles.search}
                    onChange={() => console.log('search')}
                />

                <LexemeAddButton
                    onAddLexeme={handleAddLexeme}
                />

                {/* <Select
                    className={styles.select}
                    defaultValue="all"
                    options={[
                        { value: 'all', content: 'Все слова' },
                        { value: 'new', content: 'Новые' },
                        { value: 'learning', content: 'Изучаемые' },
                        { value: 'learned', content: 'Изученные' }
                    ]}
                    onChange={(event, value) => setFilter(value)}
                /> */}
            </div>

            <LexemesList
                userId={user.id}
                lexemes={lexemes}
                onViewLexeme={handleViewLexeme}
                onEditLexeme={handleEditLexeme}
                onSelectLexeme={handleSelectLexeme}
                onDeleteLexeme={handleDeleteLexeme}
                onUpdateLexemeStatus={handleUpdateLexemeStatus}
            />

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