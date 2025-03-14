import { useCallback, useEffect, useState } from 'react';

import { LexemePublishStatus } from 'core/models/lexeme/constants';

import LexemesList from 'shared/components/lexemes-list';
import LexemesSearch from 'shared/components/lexemes-search';
import LoadingIndicator from 'shared/components/loading-indicator';
import { CMS_URL } from 'shared/constants';
import { useDictionaryActions } from 'shared/hooks/dictionary';
import { Dialog, IconButton, Tabs } from 'shared/ui-components';

import Lexeme from 'cms/components/dictionary/lexeme';
import LexemeForm from 'cms/components/dictionary/lexeme-form';
import LexemesForm from 'cms/components/dictionary/lexeme-form/LexemesForm';

import styles from './DictionaryLexemes.module.scss';

const SEARCH_URL = `${CMS_URL}/api/vocabularies/search`;

const tabs = [
    { value: LexemePublishStatus.Pending, content: 'На проверке', icon: 'pending' },
    { value: LexemePublishStatus.Approved, content: 'Утверждённые', icon: 'verified' },
    { value: LexemePublishStatus.Unapproved, content: 'Архивные', icon: 'archive' }
];

export default function DictionaryLexemes({ dictionary, user }) {
    const actions = useDictionaryActions();

    const [activeTab, setActiveTab] = useState(LexemePublishStatus.Pending);
    const [viewingLexeme, setViewingLexeme] = useState();
    const [editingLexeme, setEditingLexeme] = useState();
    const [mergingLexemes, setMergingLexemes] = useState();
    const [selectedLexemeIds, setSelectedLexemeIds] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const { lexemes = [] } = dictionary;
    const userId = user.id;

    useEffect(() => {
        setSelectedLexemeIds([]);
        setLoading(true);
        actions.getDictionary({ publishStatus: activeTab })
            .finally(() => setLoading(false));
    }, [activeTab, actions]);

    const handleAddLexeme = useCallback(data => {
        return actions.addLexeme(data)
            .then(() => setActiveTab(0));
    }, [actions]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(editingLexeme?.id, data)
            .finally(() => setEditingLexeme(null));
    }, [actions, editingLexeme?.id]);

    const handleMergeLexemes = useCallback(data => {
        return actions.mergeLexemes(data)
            .finally(() => setMergingLexemes(null));
    }, [actions]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return actions.deleteLexeme(lexemeId);
        }
    }, [actions]);

    const handleArchiveLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите архивировать слово')) {
            return actions.updateLexemePublishStatus(lexemeId, LexemePublishStatus.Unapproved);
        }
    }, [actions]);

    const handleSelectLexeme = useCallback(lexemeId => {
        setSelectedLexemeIds(ids => {
            return ids.includes(lexemeId) ?
                ids.filter(id => id !== lexemeId) :
                ids.concat(lexemeId);
        });
    }, []);

    const handleMergeLexemesRequest = useCallback(() => {
        setMergingLexemes(lexemes.filter(lexeme => selectedLexemeIds.includes(lexeme.id)));
    }, [lexemes, selectedLexemeIds]);

    const handleUpdateFoundLexeme = useCallback((foundLexeme, chosenLexeme) => {
        setMergingLexemes([foundLexeme, chosenLexeme]);
    }, []);

    const handleTabChange = useCallback((event, value) => {
        setActiveTab(value);
    }, []);

    const handleModalClose = useCallback(() => {
        setViewingLexeme(null);
        setEditingLexeme(null);
        setMergingLexemes(null);
    }, []);

    const isPending = dictionary.publishStatus === 'pending';
    const isUnapproved = dictionary.publishStatus === 'unapproved';
    const isModalOpen = viewingLexeme || editingLexeme || mergingLexemes;

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <LexemesSearch
                    className={styles.search}
                    url={SEARCH_URL}
                    lexemes={lexemes}
                    renderResultItemAction={result =>
                        <IconButton
                            icon="edit"
                            title="Редактировать лексему"
                            variant="soft"
                            onClick={() => setEditingLexeme(result.data)}
                        />
                    }
                    onAddLexeme={handleAddLexeme}
                />

                <div className={styles.toolbar}>
                    <Tabs
                        value={activeTab}
                        items={tabs.map(tab => ({
                            key: tab.value,
                            value: tab.value,
                            icon: tab.icon,
                            content: tab.content,
                            color: tab.value === activeTab ? 'primary' : undefined
                        }))}
                        tabVariant="plain"
                        variant="plain"
                        disableUnderline
                        onChange={handleTabChange}
                    />

                    {selectedLexemeIds.length > 1 &&
                        <IconButton
                            icon="edit"
                            title="Редактировать несколько лексем"
                            onClick={handleMergeLexemesRequest}
                        />
                    }
                </div>
            </div>

            <div className={styles.body}>
                {isLoading ?
                    <LoadingIndicator className={styles.loader} /> :
                    <LexemesList
                        lexemes={lexemes}
                        selectedLexemeIds={selectedLexemeIds}
                        renderLexemeActions={lexeme => [
                            {
                                icon: 'edit',
                                title: 'Редактировать слово',
                                onClick: () => setEditingLexeme(lexeme)
                            },
                            !isUnapproved && {
                                icon: 'archive',
                                title: 'Архивировать слово',
                                onClick: () => handleArchiveLexeme(lexeme.id)
                            },
                            lexeme.createdBy === userId && {
                                icon: 'delete',
                                title: 'Удалить слово',
                                onClick: () => handleDeleteLexeme(lexeme.id)
                            }
                        ]}
                        onViewLexeme={setViewingLexeme}
                        onSelectLexeme={handleSelectLexeme}
                    />
                }
            </div>

            <Dialog open={isModalOpen} onClose={handleModalClose}>
                {viewingLexeme ? (
                    <Lexeme
                        lexeme={viewingLexeme}
                        readOnly
                    />
                ) : editingLexeme ? (
                    <LexemeForm
                        id="lexeme-edit-form"
                        lexeme={editingLexeme}
                        userId={userId}
                        updateFoundLexeme={handleUpdateFoundLexeme}
                        onSubmit={handleUpdateLexeme}
                    />
                ) : mergingLexemes ? (
                    <LexemesForm
                        id="lexemes-edit-form"
                        userId={userId}
                        lexemes={mergingLexemes}
                        initialLexeme={mergingLexemes?.[0]}
                        isPending={isPending}
                        onSubmit={handleMergeLexemes}
                    />
                ) : null}
            </Dialog>
        </div>
    );
}