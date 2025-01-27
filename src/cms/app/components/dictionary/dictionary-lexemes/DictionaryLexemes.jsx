import { useCallback, useState } from 'react';

import LexemeSimpleForm from 'shared/components/lexeme-simple-form';
import LexemesList from 'shared/components/lexemes-list';
import VocabularySearch from 'shared/components/vocabulary-search';
import { useDictionaryActions } from 'shared/hooks/dictionary';
import { Dialog, IconButton, PopoverButton, Tabs } from 'shared/ui-components';

import Lexeme from 'cms/components/dictionary/lexeme';
import LexemeForm from 'cms/components/dictionary/lexeme-form';
import LexemesForm from 'cms/components/dictionary/lexeme-form/LexemesForm';
import { LexemePublishStatus } from 'core/models/lexeme/constants';

import styles from './DictionaryLexemes.module.scss';

const statuses = Object.values(LexemePublishStatus);

export default function DictionaryLexemes({ dictionary, user }) {
    const actions = useDictionaryActions();

    const [modalState, setModalState] = useState({ type: null, lexemeId: null });
    const [activeTabStatus, setActiveTabStatus] = useState(0);
    const [selectedLexemeIds, setSelectedLexemeIds] = useState([]);

    const { lexemes, numberOfLexemes } = dictionary;

    const isPending = dictionary.publishStatus === 'pending';
    const isApproved = dictionary.publishStatus === 'approved';
    const isUnapproved = dictionary.publishStatus === 'unapproved';

    const currentLexeme = lexemes.find(lexeme => lexeme.id === modalState?.lexemeId);
    const isNotCreatorLexeme = currentLexeme?.createdBy !== user.id;
    const withNotifications = isPending && isNotCreatorLexeme;

    const handleTabChange = useCallback((event, value) => {
        // TODO: setActiveTabStatus лучше вызывать в then или нет?
        actions.getDictionary(statuses[value])
            .then(() => { setActiveTabStatus(value); });
    }, [actions]);

    const handleModalOpen = useCallback((type, lexemeId = null) => {
        setModalState({ type, lexemeId });
    }, []);

    const handleModalClose = useCallback(() => setModalState({ type: null, lexemeId: null }), []);

    const handleAddLexeme = useCallback(data => {
        return actions.addLexeme(data)
            .then(() => {
                if (!activeTabStatus) return;
                //TODO: можно ли как-то обойтись без null, т.к. я по-сути использую это как заглушку
                handleTabChange(null, 0);
            });
    }, [actions, activeTabStatus, handleTabChange]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(modalState.lexemeId, data)
            .finally(() => handleModalClose());
    }, [actions, modalState.lexemeId, handleModalClose]);

    const handleMergeLexemes = useCallback(data => {
        return actions.mergeLexemes(data)
            .finally(() => handleModalClose());
    }, [actions, handleModalClose]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return actions.deleteLexeme(lexemeId);
        }
    }, [actions]);

    const handleApproveLexeme = useCallback(lexemeId => {
        return actions.updateLexemePublishStatus(lexemeId, LexemePublishStatus.Approved);
    }, [actions]);

    const handleUnapproveLexeme = useCallback(lexemeId => {
        return actions.updateLexemePublishStatus(lexemeId, LexemePublishStatus.Unapproved);
    }, [actions]);

    const handleSelectLexeme = useCallback(lexemeId => {
        setSelectedLexemeIds(ids => {
            const isSelected = ids.includes(lexemeId);

            return isSelected ?
                ids.filter(id => id !== lexemeId) :
                ids.concat(lexemeId);
        });
    }, []);

    const renderModalContent = () => {
        switch (modalState.type) {
            case 'view-lexeme':
                return <Lexeme lexeme={currentLexeme} onClose={handleModalClose} />;
            case 'edit-lexeme':
                return modalState.lexemeId && (
                    <LexemeForm
                        id="lexeme-edit-form"
                        withNotifications={withNotifications}
                        lexeme={currentLexeme}
                        onSubmit={handleUpdateLexeme}
                        onClose={handleModalClose}
                    />
                );
            case 'edit-lexemes':
                return (
                    <LexemesForm
                        id="lexemes-edit-form"
                        user={user}
                        lexemes={lexemes.filter(lexeme => selectedLexemeIds.includes(lexeme.id))}
                        withNotifications={withNotifications}
                        onSubmit={handleMergeLexemes}
                        onClose={handleModalClose}
                    />
                );
            default:
                return null;
        }
    };

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

                <IconButton
                    icon="edit"
                    title="Редактировать несколько лексем"
                    disabled={selectedLexemeIds.length < 2}
                    onClick={() => handleModalOpen('edit-lexemes')}
                />
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
                    selectedLexemeIds={selectedLexemeIds}
                    onViewLexeme={id => handleModalOpen('view-lexeme', id)}
                    onEditLexeme={id => handleModalOpen('edit-lexeme', id)}
                    onUnapprove={!isUnapproved && handleUnapproveLexeme}
                    onDeleteLexeme={isPending && handleDeleteLexeme}
                    onSelectLexeme={handleSelectLexeme}
                    onApprove={!isApproved && handleApproveLexeme}
                />

                <Dialog open={!!modalState.type} onClose={handleModalClose}>
                    {renderModalContent()}
                </Dialog>
            </div>
        </div>
    );
}