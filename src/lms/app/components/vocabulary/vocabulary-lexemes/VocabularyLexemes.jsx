import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import { useVocabularyActions } from 'shared/hooks/vocabularies';
import { Dialog, PopoverButton } from 'shared/ui-components';

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

export default function VocabularyLexemes({ vocabulary, user, learnerId, isDrawer = false }) {
    const actions = useVocabularyActions();

    const [currentLexemeId, setCurrentLexemeId] = useState(null);
    const [selectedLexemeIds, setSelectedLexemeIds] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const isLearner = user.role === 'learner';
    const isTeacher = user.role === 'teacher';

    const vocabularyId = vocabulary?.id;

    // TODO: Возможно, стоит ещё подумать над функциями и модалками, а то их ту мач
    const openModal = useCallback((lexemeId, setShowModal) => {
        setCurrentLexemeId(lexemeId);
        setShowModal(true);
    }, []);

    const closeModal = useCallback(setShowModal => {
        setCurrentLexemeId(null);
        setShowModal(false);
    }, []);

    const openViewModal = useCallback(lexemeId => {
        openModal(lexemeId, setShowViewModal);
    }, [openModal]);

    const closeViewModal = useCallback(() => {
        closeModal(setShowViewModal);
    }, [closeModal]);

    const openEditLexeme = useCallback(lexemeId => {
        openModal(lexemeId, setShowEditModal);
    }, [openModal]);

    const closeEditLexeme = useCallback(() => {
        closeModal(setShowEditModal);
    }, [closeModal]);

    const handleAddLexeme = useCallback(data => {
        if (isTeacher && isDrawer) {
            data = { ...data, learnerId };
        }

        return actions.addLexeme(vocabularyId, data)
            .finally(closeEditLexeme);
    }, [actions, closeEditLexeme, isDrawer, isTeacher, learnerId, vocabularyId]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(vocabularyId, currentLexemeId, data)
            .finally(closeEditLexeme);
    }, [actions, closeEditLexeme, currentLexemeId, vocabularyId]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        return actions.deleteLexeme(vocabularyId, lexemeId);
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

    const lexemes = vocabulary.lexemes.filter(filters[filter]);
    const currentLexeme = lexemes.find(lexeme => lexeme.id === currentLexemeId);
    const showLexemeView = currentLexeme && showViewModal;
    const showLexemeForm = currentLexeme && showEditModal;
    const isModalDrawer = currentLexeme && isDrawer;

    // TODO: возможно, стоит отрефакторить или декомпозировать, т.к. слишком много условий
    return (
        <div className={styles.root}>
            {!isModalDrawer && <div className={styles.header}>
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
                    content={isDrawer ? '' : 'Добавить слово'}
                    // TODO: т.к. внутри PopoverButton рендерится Button, то у icon внутри Button есть margin-right из-за этого пришлось добавить slotProps
                    // Стоит ли оставлять так? По-сложному тогда нужно будет переписывать PopoverButton, чтобы по условию тригером было либо Button либо IconButton
                    slotProps={isDrawer ? {
                        startDecorator: { sx: { marginRight: 0 } }
                    } : {}}
                    color="primary"
                >
                    <LexemeSimpleForm
                        numberOfLexemes={vocabulary.numberOfLexemes}
                        onSubmit={handleAddLexeme}
                    />
                </PopoverButton>
            </div>}

            <div className={styles.body}>
                {!isModalDrawer &&
                    <LexemesList
                        lexemes={lexemes}
                        isLearner={isLearner}
                        isTeacher={isTeacher}
                        isDrawer={isDrawer}
                        onViewLexeme={openViewModal}
                        onEditLexeme={openEditLexeme}
                        onSelectLexeme={handleSelectLexeme}
                        onDeleteLexeme={handleDeleteLexeme}
                        onUpdateLexemeStatus={handleUpdateLexemeStatus}
                    />}

                {showLexemeView && (
                    <>
                        {isDrawer ? (
                            <LexemeView
                                lexeme={currentLexeme}
                                onStatusUpdate={handleUpdateLexemeStatus}
                                onClose={closeViewModal}
                            />
                        ) : (
                            <Dialog open={showViewModal} onClose={closeViewModal}>
                                <LexemeView
                                    lexeme={currentLexeme}
                                    onStatusUpdate={handleUpdateLexemeStatus}
                                />
                            </Dialog>
                        )}
                    </>
                )}

                {showLexemeForm && (
                    <>
                        {isDrawer ? (
                            <LexemeForm
                                id="lexeme-edit-form"
                                lexeme={currentLexeme}
                                onSubmit={handleUpdateLexeme}
                                onClose={closeEditLexeme}
                            />
                        ) : (
                            <FormDialog
                                title={currentLexeme.value}
                                open={showEditModal}
                                titleProps={{ level: 'h2' }}
                                onClose={closeEditLexeme}
                            >
                                <LexemeForm
                                    id="lexeme-edit-form"
                                    lexeme={currentLexeme}
                                    onSubmit={handleUpdateLexeme}
                                />
                            </FormDialog>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}