import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import { useVocabularyActions } from 'shared/hooks/vocabularies';
import { Dialog, PopoverButton } from 'shared/ui-components';

import Lexeme from 'lms/components/vocabulary/lexeme';
import LexemeForm from 'lms/components/vocabulary/lexeme-form';
import LexemeSimpleForm from 'lms/components/vocabulary/lexeme-simple-form';
import LexemeView from 'lms/components/vocabulary/lexeme-view';
import LexemesList from 'lms/components/vocabulary/lexemes-list';
import VocabularySearch from 'lms/components/vocabulary/vocabulary-search';

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
    const isTeacher = user.role === 'teacher';

    const closeModal = useCallback(setShowModal => {
        setCurrentLexemeId(null);
        setShowModal(false);
    }, []);

    const closeViewModal = useCallback(() => {
        closeModal(setShowViewModal);
    }, [closeModal]);

    const closeEditLexeme = useCallback(() => {
        closeModal(setShowEditModal);
    }, [closeModal]);

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
    const showView = currentLexeme && showViewModal;
    const showForm = currentLexeme && showEditModal;
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
                        lexemes={lexemes}
                        readOnly={readOnly}
                        onViewLexeme={handleViewLexeme}
                        onEditLexeme={handleEditLexeme}
                        onSelectLexeme={handleSelectLexeme}
                        onDeleteLexeme={handleDeleteLexeme}
                        onUpdateLexemeStatus={handleUpdateLexemeStatus}
                    />
                }

                {showView && (
                    <LexemeView
                        as={inline ? undefined : Dialog}
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

                {showForm && (
                    <LexemeView
                        as={inline ? undefined : FormDialog}
                        modal={!inline}
                        onClose={closeViewModal}
                    >
                        <LexemeForm
                            id="lexeme-edit-form"
                            lexeme={currentLexeme}
                            onSubmit={handleUpdateLexeme}
                            onClose={closeEditLexeme}
                        />
                    </LexemeView>
                )}
            </div>
        </div>
    );
}