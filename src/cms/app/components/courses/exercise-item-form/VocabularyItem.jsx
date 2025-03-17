import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import LexemesList from 'shared/components/lexemes-list';
import LexemesSearch from 'shared/components/lexemes-search';
import { CMS_URL } from 'shared/constants';
import { useDictionaryActions } from 'shared/hooks/dictionary';
import { useUser } from 'shared/hooks/user';
import http from 'shared/services/http';
import { Dialog, IconButton } from 'shared/ui-components';

import Lexeme from 'cms/components/dictionary/lexeme';
import LexemeForm from 'cms/components/dictionary/lexeme-form';

import styles from './VocabularyItemForm.module.scss';

const SEARCH_URL = `${CMS_URL}/api/vocabularies/search`;

function VocabularyItemForm({ lexemeIds = [] }, ref) {
    const [user] = useUser();
    const actions = useDictionaryActions();

    const lexemeIdsRef = useRef(lexemeIds);

    const [lexemes, setLexemes] = useState(lexemeIds);
    const [viewingLexeme, setViewingLexeme] = useState();
    const [editingLexeme, setEditingLexeme] = useState();

    useEffect(() => {
        http.get('/lexemes', { params: { ids: lexemeIds } })
            .then(response => setLexemes(response.data));
    }, [/* no deps */]);

    useImperativeHandle(ref, () => ({
        get props() {
            return {
                lexemeIds: lexemeIdsRef.current
            };
        }
    }));

    const updateLexeme = useCallback(data => {
        return actions.updateLexeme(editingLexeme?.id, data)
            .finally(() => setEditingLexeme(null));
    }, [editingLexeme?.id, actions]);

    const addLexeme = useCallback(lexeme => {
        lexemeIdsRef.current.push(lexeme.id);
        setLexemes(lexemes => lexemes.concat(lexeme));
    }, []);

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
                        onClick={() => addLexeme(result.data)}
                    />
                }
                onAddLexeme={addLexeme}
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
                        onSubmit={updateLexeme}
                    />
                ) : null}
            </Dialog>
        </div>
    );
}

export default forwardRef(VocabularyItemForm);