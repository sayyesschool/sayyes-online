import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { LexemePublishStatus } from 'core/models/lexeme/constants';

import LexemesList from 'shared/components/lexemes-list';
import LexemesSearch from 'shared/components/lexemes-search';
import { CMS_URL } from 'shared/constants';
import { useDictionaryActions } from 'shared/hooks/dictionary';
import { useUser } from 'shared/hooks/user';
import http from 'shared/services/http';
import { Dialog, IconButton } from 'shared/ui-components';

import Lexeme from 'cms/components/dictionary/lexeme';
import LexemeForm from 'cms/components/dictionary/lexeme-form';

import styles from './VocabularyItem.module.scss';

const SEARCH_URL = `${CMS_URL}/api/vocabularies/search`;

function VocabularyItemForm({ lexemeIds = [] }, ref) {
    const [user] = useUser();
    const { addLexeme, updateLexeme, updateLexemePublishStatus } = useDictionaryActions();

    const lexemeIdsRef = useRef(lexemeIds);

    const [lexemes, setLexemes] = useState([]);
    const [viewingLexeme, setViewingLexeme] = useState();
    const [editingLexeme, setEditingLexeme] = useState();

    useEffect(() => {
        const params = new URLSearchParams();
        lexemeIds?.forEach(id => params.append('lexemeIds', id));

        http.get(`/api/dictionary/lexemes?${params.toString()}`)
            .then(response => setLexemes(response.data));
    }, []);

    useImperativeHandle(ref, () => ({
        get props() {
            return {
                lexemeIds: lexemeIdsRef.current
            };
        }
    }));

    const handleUpdateLexeme = useCallback(data => {
        return updateLexeme(editingLexeme?.id, data)
            .then(() => {
                setLexemes(lexemes => lexemes.map(l => l.id === editingLexeme.id ? data : l));
            })
            .finally(() => setEditingLexeme(null));
    }, [editingLexeme?.id, updateLexeme]);

    const handleAddLexeme = useCallback(lexeme => {
        lexemeIdsRef.current.push(lexeme.id);

        setLexemes(lexemes => lexemes.concat(lexeme));
    }, []);

    const handleCreateLexeme = useCallback(async lexeme => {
        return addLexeme(lexeme)
            .then(response => {
                return updateLexemePublishStatus(response.data.id, LexemePublishStatus.Approved);
            }).then(response => {
                handleAddLexeme(response.data);
            });
    }, [addLexeme, handleAddLexeme, updateLexemePublishStatus]);

    const removeLexeme = useCallback(lexeme => {
        lexemeIdsRef.current = lexemeIdsRef.current.filter(id => id !== lexeme.id);
        setLexemes(lexemes => lexemes.filter(l => l.id !== lexeme.id));
    }, []);

    const closeModal = useCallback(() => {
        setViewingLexeme(null);
        setEditingLexeme(null);
    }, []);

    const isModalOpen = viewingLexeme || editingLexeme;

    return (
        <div className={styles.root}>
            <LexemesSearch
                url={SEARCH_URL}
                lexemes={lexemes}
                renderResultItemAction={result =>
                    <IconButton
                        icon="add"
                        title="Добавить слово"
                        variant="soft"
                        onClick={() => handleAddLexeme(result.data)}
                    />
                }
                onAddLexeme={handleCreateLexeme}
            />

            <LexemesList
                lexemes={lexemes}
                renderLexemeActions={lexeme => [
                    {
                        icon: 'edit',
                        title: 'Редактировать слово',
                        onClick: () => setEditingLexeme(lexeme)
                    },
                    {
                        icon: 'delete',
                        title: 'Удалить слово',
                        onClick: () => removeLexeme(lexeme)
                    }
                ]}
                onViewLexeme={setViewingLexeme}
            />

            <Dialog open={isModalOpen} onClose={closeModal}>
                {viewingLexeme ? (
                    <Lexeme
                        lexeme={viewingLexeme}
                        readOnly
                    />
                ) : editingLexeme ? (
                    <LexemeForm
                        id="lexeme-edit-form"
                        lexeme={editingLexeme}
                        userId={user?.id}
                        onSubmit={handleUpdateLexeme}
                    />
                ) : null}
            </Dialog>
        </div>
    );
}

export default forwardRef(VocabularyItemForm);