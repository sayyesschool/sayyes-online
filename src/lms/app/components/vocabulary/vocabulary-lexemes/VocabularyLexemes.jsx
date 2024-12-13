import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import { useVocabularyActions } from 'shared/hooks/vocabularies';
import { Dialog, PopoverButton, Tabs } from 'shared/ui-components';

import { LexemePublishStatus } from 'core/models/lexeme/Lexeme';
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
    learned: lexeme => lexeme.status === 5,
    approved: lexeme => lexeme.publishStatus === LexemePublishStatus.Approved,
    unapproved: lexeme => lexeme.publishStatus === LexemePublishStatus.Unapproved,
    pending: lexeme => lexeme.publishStatus === LexemePublishStatus.Pending
};

const statuses = Object.values(LexemePublishStatus);

export default function VocabularyLexemes({
    vocabulary,
    user,
    learnerId,
    inline
}) {
    const actions = useVocabularyActions();
    const [currentLexemeId, setCurrentLexemeId] = useState(null);
    const [selectedLexemeIds, setSelectedLexemeIds] = useState([]);
    const isEditor = user.role === 'editor';
    const [filter, setFilter] = useState(isEditor ? 'pending' : 'all');
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [activeTabStatus, setActiveTabStatus] = useState(0);

    const vocabularyId = vocabulary?.id;
    const lexemes = vocabulary.lexemes.filter(filters[filter]);
    const currentLexeme = lexemes.find(lexeme => lexeme.id === currentLexemeId);
    const showHeader = !inline || !currentLexeme;
    const showList = showHeader;
    const isTeacher = user.role === 'teacher';
    const readOnly = isTeacher;

    const handleTabChange = useCallback((event, value) => {
        setFilter(statuses[value]);
        setActiveTabStatus(value);
    }, []);

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
                    <>
                        {isEditor &&
                            <Tabs
                                value={activeTabStatus}
                                items={statuses.map((status, index) => ({
                                    key: index,
                                    content: status,
                                    color: index === activeTabStatus ? 'primary' : undefined
                                }))}
                                tabVariant="plain"
                                variant="plain"
                                onChange={handleTabChange}
                            />
                        }

                        <LexemesList
                            lexemes={lexemes}
                            readOnly={readOnly}
                            onViewLexeme={handleViewLexeme}
                            onEditLexeme={handleEditLexeme}
                            onSelectLexeme={handleSelectLexeme}
                            onDeleteLexeme={handleDeleteLexeme}
                            onUpdateLexemeStatus={handleUpdateLexemeStatus}
                        />
                    </>
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