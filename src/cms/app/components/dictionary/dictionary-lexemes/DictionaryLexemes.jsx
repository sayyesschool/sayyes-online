import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LexemesList from 'shared/components/lexemes-list';
import { useDictionaryActions } from 'shared/hooks/dictionary';
import { Dialog, PopoverButton, Tabs } from 'shared/ui-components';

import { LexemePublishStatus } from 'core/models/lexeme/constants';
// TODO: Lexeme в shared
import Lexeme from 'lms/components/vocabulary/lexeme';
import LexemeForm from 'lms/components/vocabulary/lexeme-form';
import LexemeSimpleForm from 'lms/components/vocabulary/lexeme-simple-form';
import LexemeView from 'lms/components/vocabulary/lexeme-view';
import VocabularySearch from 'lms/components/vocabulary/vocabulary-search';

import styles from './DictionaryLexemes.module.scss';

const statuses = Object.values(LexemePublishStatus);

export default function DictionaryLexemes({ dictionary, user }) {
    const actions = useDictionaryActions();

    const [currentLexemeId, setCurrentLexemeId] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [activeTabStatus, setActiveTabStatus] = useState(0);

    const { id, lexemes, numberOfLexemes } = dictionary;

    const vocabularyId = id;
    const isTeacher = user.isTeacher;
    const isPending = dictionary.publishStatus === 'pending';
    const isApproved = dictionary.publishStatus === 'approved';
    const isUnapproved = dictionary.publishStatus === 'unapproved';

    const handleTabChange = useCallback((event, value) => {
        actions.getDictionary(statuses[value]);
        setActiveTabStatus(value);
    }, [actions]);

    const closeViewModal = useCallback(() => {
        setCurrentLexemeId(null);
        setShowViewModal(false);
    }, []);

    const closeEditModal = useCallback(() => {
        setCurrentLexemeId(null);
        setShowEditModal(false);
    }, []);

    const handleAddLexeme = useCallback(data => {
        return actions.addLexeme(data)
            .finally(() => setShowEditModal(false));
    }, [actions]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(vocabularyId, currentLexemeId, data)
            .finally(() => setShowEditModal(false));
    }, [vocabularyId, currentLexemeId, actions]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return actions.deleteLexeme(lexemeId);
        }
    }, [actions]);

    const handleApproveLexeme = useCallback(lexemeId => {
        return actions.updateLexemePublishStatus(lexemeId, LexemePublishStatus.Approved );
    }, [actions]);

    const handleUnapproveLexeme = useCallback(lexemeId => {
        return actions.updateLexemePublishStatus(lexemeId, LexemePublishStatus.Unapproved );
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

    const currentLexeme = lexemes.find(lexeme => lexeme.id === currentLexemeId);
    const readOnly = isTeacher;

    return (
        <div className={styles.root}>

            <div className={styles.header}>
                <VocabularySearch
                    className={styles.search}
                    lexemes={lexemes}
                    onAddLexeme={handleAddLexeme}
                />

                <PopoverButton
                    key={numberOfLexemes}
                    icon="add"
                    content="Добавить слово"
                    color="primary"
                    variant="solid"
                >
                    <LexemeSimpleForm
                        numberOfLexemes={numberOfLexemes}
                        onSubmit={handleAddLexeme}
                    />
                </PopoverButton>
            </div>

            <div className={styles.body}>
                <Tabs
                    value={activeTabStatus}
                    items={['На проверке', 'Утверждённые', 'Архивные'].map((status, index) => ({
                        key: index,
                        content: status,
                        color: index === activeTabStatus ? 'primary' : undefined
                    }))}
                    tabVariant="plain"
                    variant="plain"
                    onChange={handleTabChange}
                />

                <LexemesList
                    user={user}
                    lexemes={lexemes}
                    readOnly={readOnly}
                    onViewLexeme={handleViewLexeme}
                    onEditLexeme={handleEditLexeme}
                    onApprove={!isApproved && handleApproveLexeme}
                    onUnapprove={!isUnapproved && handleUnapproveLexeme}
                    onDeleteLexeme={isPending && handleDeleteLexeme}
                    // onSelectLexeme={handleSelectLexeme}
                />

                {currentLexeme && (
                    <LexemeView
                        as={Dialog}
                        open={showViewModal}
                        onClose={closeViewModal}
                    >
                        <Lexeme
                            lexeme={currentLexeme}
                            readOnly={readOnly}
                            // onStatusUpdate={handleUpdateLexemeStatus}
                            onClose={closeViewModal}
                        />
                    </LexemeView>
                )}

                {currentLexeme && (
                    <LexemeView
                        as={FormDialog}
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