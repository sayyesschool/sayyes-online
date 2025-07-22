import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { LexemePublishStatus } from 'core/models/lexeme/constants';

import FormDialog from '@/shared/components/form-dialog';
import LexemesList from 'shared/components/lexemes-list';
import LexemesSearch from 'shared/components/lexemes-search';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useDictionaryApi } from 'shared/hooks/dictionary';
import { Dialog, IconButton } from 'shared/ui-components';

import Lexeme from 'cms/components/dictionary/lexeme';
import LexemeForm from 'cms/components/dictionary/lexeme-form';

import styles from './VocabularyItem.module.scss';

const SEARCH_URL = '/api/dictionary/search';

function VocabularyItemForm({ lexemeIds = [] }, ref) {
    const {
        getLexemes,
        createLexeme,
        updateLexeme
    } = useDictionaryApi();

    const lexemeIdsRef = useRef(lexemeIds);

    const [lexemes, setLexemes] = useState(null);
    const [viewingLexeme, setViewingLexeme] = useState();
    const [editingLexeme, setEditingLexeme] = useState();

    useImperativeHandle(ref, () => ({
        get props() {
            return {
                lexemeIds: lexemeIdsRef.current
            };
        }
    }));

    useEffect(() => {
        getLexemes(lexemeIdsRef.current)
            .then(lexemes => setLexemes(lexemes));
    }, [getLexemes]);

    const addLexeme = useCallback(lexeme => {
        lexemeIdsRef.current.push(lexeme.id);
        setLexemes(lexemes => lexemes.concat(lexeme));
    }, []);

    const removeLexeme = useCallback(lexeme => {
        lexemeIdsRef.current = lexemeIdsRef.current.filter(id => id !== lexeme.id);
        setLexemes(lexemes => lexemes.filter(l => l.id !== lexeme.id));
    }, []);

    const handleAddLexeme = useCallback(lexeme => {
        return createLexeme({
            ...lexeme,
            publishStatus: LexemePublishStatus.Approved
        }).then(response => {
            addLexeme(response);
        });
    }, [createLexeme, addLexeme]);

    const handleUpdateLexeme = useCallback(data => {
        return updateLexeme(editingLexeme?.id, data)
            .then(() => {
                setLexemes(lexemes => lexemes.map(l => l.id === editingLexeme.id ? data : l));
            })
            .finally(() => setEditingLexeme(null));
    }, [editingLexeme?.id, updateLexeme]);

    if (!lexemes) return <LoadingIndicator />;

    return (
        <div className={styles.root}>
            <LexemesSearch
                key={lexemes.length}
                className={styles.search}
                url={SEARCH_URL}
                lexemes={lexemes}
                params={{ publishStatus: LexemePublishStatus.Approved }}
                renderResultItemAction={result =>
                    <IconButton
                        icon="add"
                        title="Добавить слово"
                        variant="soft"
                        onClick={() => addLexeme(result.data)}
                    />
                }
                onAddLexeme={handleAddLexeme}
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
                        icon: 'remove',
                        title: 'Убрать слово',
                        onClick: () => removeLexeme(lexeme)
                    }
                ]}
                onViewLexeme={setViewingLexeme}
            />

            <Dialog
                open={!!viewingLexeme}
                onClose={() => setViewingLexeme(null)}
            >
                <Lexeme
                    lexeme={viewingLexeme}
                    readOnly
                />
            </Dialog>

            <FormDialog
                title="Редактирование лексемы"
                open={!!editingLexeme}
                onClose={() => setEditingLexeme(null)}
            >
                <LexemeForm
                    id="lexeme-edit-form"
                    lexeme={editingLexeme}
                    onSubmit={handleUpdateLexeme}
                />
            </FormDialog>
        </div>
    );
}

export default forwardRef(VocabularyItemForm);