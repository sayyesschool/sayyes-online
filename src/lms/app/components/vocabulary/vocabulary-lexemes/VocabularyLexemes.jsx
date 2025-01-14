import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LexemeSimpleForm from 'shared/components/lexeme-simple-form';
import LexemesList from 'shared/components/lexemes-list';
import VocabularySearch from 'shared/components/vocabulary-search';
import { useVocabularyActions } from 'shared/hooks/vocabularies';
import { Dialog, PopoverButton } from 'shared/ui-components';

import Lexeme from 'lms/components/vocabulary/lexeme';
import LexemeForm from 'lms/components/vocabulary/lexeme-form';
import LexemeView from 'lms/components/vocabulary/lexeme-view';

import styles from './VocabularyLexemes.module.scss';

const filters = {
    all: () => true,
    new: lexeme => lexeme.status === 0,
    learning: lexeme => lexeme.status > 0 && lexeme.status < 5,
    learned: lexeme => lexeme.status === 5
};

export default function VocabularyLexemes({
    vocabulary,
    user,
    learnerId,
    inline
}) {
    const actions = useVocabularyActions();

    const [currentLexemeId, setCurrentLexemeId] = useState(null);
    const [selectedLexemeIds, setSelectedLexemeIds] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const vocabularyId = vocabulary?.id;
    const isTeacher = user.isTeacher;

    const closeViewModal = useCallback(() => {
        setCurrentLexemeId(null);
        setShowViewModal(false);
    }, []);

    const closeEditModal = useCallback(() => {
        setCurrentLexemeId(null);
        setShowEditModal(false);
    }, []);

    const handleAddLexeme = useCallback(data => {
        if (isTeacher) {
            data = { ...data, learnerId };
        }

        return actions.addLexeme(vocabularyId, data)
            .finally(() => setShowEditModal(false));
    }, [isTeacher, learnerId, vocabularyId, actions]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(vocabularyId, currentLexemeId, data)
            .finally(() => setShowEditModal(false));
    }, [vocabularyId, currentLexemeId, actions]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return actions.deleteLexeme(vocabularyId, lexemeId);
        }
    }, [actions, vocabularyId]);

    const handleSelectLexeme = useCallback(lexemeId => {
        setSelectedLexemeIds(ids => {
            const isSelected = ids.includes(lexemeId);

            return isSelected ?
                ids.filter(id => id !== lexemeId) :
                ids.concat(lexemeId);
        });
    }, []);

    const handleUpdateLexemeStatus = useCallback((lexemeId, status) => {
        return actions.updateLexemeStatus(lexemeId, status);
    }, [actions]);

    const handleViewLexeme = useCallback(lexemeId => {
        setCurrentLexemeId(lexemeId);
        setShowViewModal(true);
        setShowEditModal(false);
    }, []);

    const handleEditLexeme = useCallback(lexemeId => {
        setCurrentLexemeId(lexemeId);
        setShowEditModal(true);
        setShowViewModal(false);
    }, []);

    const lexemes = vocabulary.lexemes.filter(filters[filter]);
    const currentLexeme = lexemes.find(lexeme => lexeme.id === currentLexemeId);
    const showHeader = !inline || !currentLexeme;
    const showList = showHeader;
    const readOnly = isTeacher;

    return (
        <div className={styles.root}>
            {showHeader &&
                <div className={styles.header}>
                    {/* Временно отключили */}
                    {/* <Checkbox
                        checked={false}
                        onChange={() => console.log('check')}
                    /> */}

                    <VocabularySearch
                        className={styles.search}
                        lexemes={lexemes}
                        onAddLexeme={handleAddLexeme}
                    />

                    <PopoverButton
                        key={vocabulary.numberOfLexemes}
                        icon="add"
                        content={inline ? undefined : 'Добавить слово'}
                        color="primary"
                        variant="solid"
                    >
                        <LexemeSimpleForm
                            numberOfLexemes={vocabulary.numberOfLexemes}
                            onSubmit={handleAddLexeme}
                        />
                    </PopoverButton>
                </div>
            }

            <div className={styles.body}>
                {showList &&
                    <LexemesList
                        user={user}
                        lexemes={lexemes}
                        readOnly={readOnly}
                        onViewLexeme={handleViewLexeme}
                        onEditLexeme={handleEditLexeme}
                        onSelectLexeme={handleSelectLexeme}
                        onDeleteLexeme={handleDeleteLexeme}
                        onUpdateLexemeStatus={handleUpdateLexemeStatus}
                    />
                }

                {currentLexeme && (
                    <LexemeView
                        as={inline ? undefined : Dialog}
                        open={showViewModal}
                        onClose={closeViewModal}
                    >
                        <Lexeme
                            lexeme={currentLexeme}
                            readOnly={readOnly}
                            onStatusUpdate={handleUpdateLexemeStatus}
                            onClose={closeViewModal}
                        />
                    </LexemeView>
                )}

                {currentLexeme && (
                    <LexemeView
                        as={inline ? undefined : FormDialog}
                        open={showEditModal}
                        onClose={closeViewModal}
                    >
                        <LexemeForm
                            id="lexeme-edit-form"
                            lexeme={currentLexeme}
                            onSubmit={handleUpdateLexeme}
                            onClose={closeEditModal}
                        />
                    </LexemeView>
                )}
            </div>
        </div>
    );
}