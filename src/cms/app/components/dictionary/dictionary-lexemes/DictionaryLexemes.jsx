import { useCallback, useState } from 'react';

import { LexemePublishStatus } from 'core/models/lexeme/constants';

import LexemesList from 'shared/components/lexemes-list';
import VocabularySearch from 'shared/components/vocabulary-search';
import { CMS_URL } from 'shared/constants';
import { useDictionaryActions } from 'shared/hooks/dictionary';
import { Dialog, IconButton, Tabs } from 'shared/ui-components';

import Lexeme from 'cms/components/dictionary/lexeme';
import LexemeForm from 'cms/components/dictionary/lexeme-form';
import LexemesForm from 'cms/components/dictionary/lexeme-form/LexemesForm';

import styles from './DictionaryLexemes.module.scss';

const statuses = Object.values(LexemePublishStatus);

export default function DictionaryLexemes({ dictionary, user }) {
    const actions = useDictionaryActions();
    const [modalState, setModalState] = useState({ type: null, lexeme: null });
    const [activeTabStatus, setActiveTabStatus] = useState(0);
    const [selectedLexemeIds, setSelectedLexemeIds] = useState([]);
    const [foundSearchLexeme, setFoundSearchLexeme] = useState();

    const { lexemes } = dictionary;
    const userId = user.id;

    const isPending = dictionary.publishStatus === 'pending';
    const isUnapproved = dictionary.publishStatus === 'unapproved';

    const handleTabChange = useCallback((event, value) => {
        // TODO: setActiveTabStatus лучше вызывать в then или нет?
        actions.getDictionary(statuses[value])
            .then(() => { setActiveTabStatus(value); });
    }, [actions]);

    const handleModalOpen = useCallback((type, lexeme = null) => {
        setModalState({ type, lexeme });
    }, []);

    const handleModalClose = useCallback(() => {
        setModalState({ type: null, lexeme: null });
        setFoundSearchLexeme(null);
    }, []);

    const handleAddLexeme = useCallback(data => {
        return actions.addLexeme(data)
            .then(() => {
                if (!activeTabStatus) return;
                //TODO: можно ли как-то обойтись без null, т.к. я по-сути использую это как заглушку
                handleTabChange(null, 0);
            });
    }, [actions, activeTabStatus, handleTabChange]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(modalState.lexeme.id, data)
            .finally(() => handleModalClose());
    }, [actions, modalState.lexeme, handleModalClose]);

    const handleMergeLexemes = useCallback(data => {
        return actions.mergeLexemes(data)
            .finally(() => handleModalClose());
    }, [actions, handleModalClose]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return actions.deleteLexeme(lexemeId);
        }
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

    const handleUpdateFoundLexeme = useCallback((foundLexeme, chosenLexeme) => {
        setFoundSearchLexeme([foundLexeme, chosenLexeme]);
        handleModalOpen('edit-lexemes');
    }, [handleModalOpen, setFoundSearchLexeme]);

    const renderModalContent = () => {
        switch (modalState.type) {
            case 'view-lexeme':
                return (
                    <Lexeme
                        readOnly={true}
                        lexeme={modalState.lexeme}
                        onClose={handleModalClose}
                    />
                );
            case 'edit-lexeme':
                return modalState.lexeme && (
                    <LexemeForm
                        id="lexeme-edit-form"
                        lexeme={modalState.lexeme}
                        userId={userId}
                        updateFoundLexeme={handleUpdateFoundLexeme}
                        onSubmit={handleUpdateLexeme}
                        onClose={handleModalClose}
                    />
                );
            case 'edit-lexemes':
                return (
                    <LexemesForm
                        id="lexemes-edit-form"
                        userId={userId}
                        lexemes={foundSearchLexeme ?? lexemes.filter(lexeme => selectedLexemeIds.includes(lexeme.id))}
                        initialLexeme={foundSearchLexeme?.[0]}
                        isPending={isPending}
                        onSubmit={handleMergeLexemes}
                        onClose={handleModalClose}
                    />
                );
            default:
                return null;
        }
    };

    const getActionButtons = lexeme => {
        const isCreatorLexeme = lexeme.createdBy === userId;

        return [
            {
                icon: 'verified',
                title: 'Редактировать слово',
                handler: () => handleModalOpen('edit-lexeme', lexeme)
            },
            !isUnapproved && {
                icon: 'clear',
                title: 'Архивировать слово',
                handler: () => handleUnapproveLexeme(lexeme.id)
            },
            isCreatorLexeme && {
                icon: 'delete',
                title: 'Удалить слово',
                handler: () => handleDeleteLexeme(lexeme.id)
            }].filter(Boolean);
    };

    return (
        <div className={styles.root}>

            <div className={styles.header}>
                <VocabularySearch
                    className={styles.search}
                    lexemes={lexemes}
                    domain={CMS_URL}
                    onAddLexeme={handleAddLexeme}
                    onEditLexeme={lexeme => handleModalOpen('edit-lexeme', lexeme)}
                />

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
                    lexemes={lexemes}
                    selectedLexemeIds={selectedLexemeIds}
                    getActionButtons={getActionButtons}
                    onViewLexeme={lexeme => handleModalOpen('view-lexeme', lexeme)}
                    onSelectLexeme={handleSelectLexeme}
                />

                <Dialog open={!!modalState.type} onClose={handleModalClose}>
                    {renderModalContent()}
                </Dialog>
            </div>
        </div>
    );
}