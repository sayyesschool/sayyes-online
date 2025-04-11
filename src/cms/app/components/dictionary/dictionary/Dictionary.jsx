import { useCallback, useEffect, useState } from 'react';

import { LexemePublishStatus } from 'core/models/lexeme/constants';

import LexemesList from 'shared/components/lexemes-list';
import LexemesSearch from 'shared/components/lexemes-search';
import LoadingIndicator from 'shared/components/loading-indicator';
import { CMS_URL } from 'shared/constants';
import { useDictionaryActions } from 'shared/hooks/dictionary';
import { Button, Dialog, Flex, IconButton, Tabs, Text } from 'shared/ui-components';

import Lexeme from 'cms/components/dictionary/lexeme';
import LexemeForm from 'cms/components/dictionary/lexeme-form';
import LexemesMergeForm from 'cms/components/dictionary/lexemes-merge-form';

import styles from './Dictionary.module.scss';

const SEARCH_URL = `${CMS_URL}/api/vocabularies/search`;

const tabs = [
    { value: LexemePublishStatus.Pending, content: 'На проверке', icon: 'pending' },
    { value: LexemePublishStatus.Approved, content: 'Утверждённые', icon: 'verified' },
    { value: LexemePublishStatus.Archived, content: 'Архивные', icon: 'archive' }
];

export default function Dictionary({ dictionary, user }) {
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

    const handleCreateLexeme = useCallback(data => {
        return actions.createLexeme(data)
            .then(() => setActiveTab(LexemePublishStatus.Pending));
    }, [actions]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(editingLexeme?.id, data)
            .finally(() => setEditingLexeme(null));
    }, [actions, editingLexeme?.id]);

    const handleMergeLexemes = useCallback(data => {
        return actions.mergeLexemes(data)
            .finally(() => {
                setSelectedLexemeIds([]);
                setMergingLexemes(null);
            });
    }, [actions]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return actions.deleteLexeme(lexemeId);
        }
    }, [actions]);

    const handleArchiveLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите архивировать слово')) {
            return actions.updateLexemePublishStatus(lexemeId, LexemePublishStatus.Archived);
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
        const lexemesById = lexemes.reduce((acc, lexeme) => {
            acc[lexeme.id] = lexeme;

            return acc;
        }, {});

        setMergingLexemes(selectedLexemeIds.map(id => lexemesById[id]));
    }, [lexemes, selectedLexemeIds]);

    const handleMatch = useCallback((foundLexeme, chosenLexeme) => {
        setEditingLexeme(null);
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

    const isModalOpen = viewingLexeme || editingLexeme || mergingLexemes;

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <LexemesSearch
                    className={styles.search}
                    url={SEARCH_URL}
                    isResultDisabled={result =>
                        !!lexemes.find(lexeme => lexeme.id === result.id)
                    }
                    renderResultItemAction={result =>
                        <IconButton
                            icon="edit"
                            title="Редактировать лексему"
                            variant="soft"
                            onClick={() => setEditingLexeme(result.data)}
                        />
                    }
                    onAddLexeme={handleCreateLexeme}
                />

                <Tabs
                    className={styles.tabs}
                    value={activeTab}
                    items={tabs.map(tab => ({
                        key: tab.value,
                        value: tab.value,
                        icon: tab.icon,
                        content: tab.content,
                        color: tab.value === activeTab ? 'primary' : undefined
                    }))}
                    tabFlex={1}
                    tabVariant="plain"
                    variant="plain"
                    onChange={handleTabChange}
                />

                <div className={styles.toolbar}>
                    {selectedLexemeIds.length > 1 &&
                        <Flex alignItems="center" justifyContent="space-between">
                            <Text
                                content={`Выбрано ${selectedLexemeIds.length} лексемы`} end={
                                    <Button
                                        content="Снять выделение"
                                        variant="plain"
                                        size="sm"
                                        onClick={() => selectedLexemeIds([])}
                                    />
                                }
                            />

                            <IconButton
                                icon="join"
                                title="Объединить лексемы"
                                onClick={handleMergeLexemesRequest}
                            />
                        </Flex>
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
                                icon: lexeme.isApproved ? 'edit' : 'checklist',
                                title: `${lexeme.isApproved ? 'Редактировать' : 'Утвердить'} слово`,
                                onClick: () => setEditingLexeme(lexeme)
                            },
                            !lexeme.isArchived && {
                                icon: 'archive',
                                title: 'Архивировать слово',
                                onClick: () => handleArchiveLexeme(lexeme.id)
                            },
                            !lexeme.isApproved && {
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

            <Dialog
                className={styles.modal}
                open={isModalOpen}
                onClose={handleModalClose}
            >
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
                        onMatch={handleMatch}
                        onSubmit={handleUpdateLexeme}
                    />
                ) : mergingLexemes ? (
                    <LexemesMergeForm
                        id="lexemes-edit-form"
                        userId={userId}
                        lexemes={mergingLexemes}
                        initialLexeme={mergingLexemes?.[0]}
                        onSubmit={handleMergeLexemes}
                    />
                ) : null}
            </Dialog>
        </div>
    );
}