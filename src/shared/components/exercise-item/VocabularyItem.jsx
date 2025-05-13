import { useCallback, useEffect, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LexemesList from 'shared/components/lexemes-list';
import { useUser } from 'shared/hooks/user';
import { useVocabularyActions } from 'shared/hooks/vocabularies';
import http from 'shared/services/http';
import { Dialog, Flex, IconButton, Surface, Text } from 'shared/ui-components';

import Lexeme from 'lms/components/vocabulary/lexeme';
import LexemeForm from 'lms/components/vocabulary/lexeme-form';
import LexemeStatus from 'lms/components/vocabulary/lexeme-status';
import LexemeView from 'lms/components/vocabulary/lexeme-view';

export default function VocabularyItem({ lexemeIds }) {
    const [user] = useUser();
    const { addLexeme, updateLexeme, deleteLexeme, updateLexemeStatus } = useVocabularyActions();
    const [lexemes, setLexemes] = useState([]);
    const [viewingLexeme, setViewingLexeme] = useState();
    const [editingLexeme, setEditingLexeme] = useState();

    const newLexemeIds = lexemes.filter(({ data }) => !data).map(({ id }) => id);
    const disableAddAllBtn = newLexemeIds.length === 0;

    const updateList = useCallback(lexeme => {
        setLexemes(lexemes => lexemes.map(item => item.id === lexeme.id ? lexeme : item));
    }, []);

    useEffect(() => {
        const domain = window.location.hostname.startsWith('cms') ? 'dictionary' : 'vocabularies';

        const params = new URLSearchParams();
        lexemeIds?.forEach(id => params.append('lexemeIds', id));

        http.get(`/api/${domain}/lexemes?${params.toString()}`)
            .then(response => setLexemes(response.data));
    }, []);

    const handleAddLexeme = useCallback(data => {
        return addLexeme('my', data).then(response => {
            updateList(response.data);
        });
    }, [addLexeme, updateList]);

    const handleAddAllLexemes = useCallback(() => {
        http.post('/api/vocabularies/lexemes', { newLexemeIds })
            .then(({ data }) => setLexemes(prev =>
                prev.map(item => data.find(u => u.id === item.id) || item)
            ));
    }, [newLexemeIds]);

    const handleUpdateLexeme = useCallback(data => {
        return updateLexeme('my', editingLexeme?.id, data).then(response => {
            updateList(response.data);
        }).finally(() => setEditingLexeme(null));
    }, [updateLexeme, editingLexeme?.id, updateList]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return deleteLexeme('my', lexemeId).then(response => {
                updateList(response.data);
            });
        }
    }, [deleteLexeme, updateList]);

    const handleUpdateLexemeStatus = useCallback((lexemeId, status) => {
        return updateLexemeStatus(lexemeId, status).then(response => {
            updateList(response.data);
        });
    }, [updateLexemeStatus, updateList]);

    const handleModalClose = useCallback(() => {
        setViewingLexeme(null);
        setEditingLexeme(null);
    }, []);

    return (
        <>
            <Flex
                alignItems="center"
                justifyContent="space-between"
            >
                <Text>Vocabulary</Text>

                {!user.isManager && <IconButton
                    title="Добавить все слова"
                    icon="add"
                    disabled={disableAddAllBtn}
                    onClick={() => handleAddAllLexemes()}
                />}
            </Flex>

            <Surface variant="outlined">
                <LexemesList
                    lexemes={lexemes}
                    renderLexemeActions={lexeme => {
                        if (user.isManager) return [];

                        return lexeme.data ? [
                            <LexemeStatus
                                key={lexeme.id}
                                level={lexeme.status}
                                readOnly={user.isTeacher}
                                onChange={status => handleUpdateLexemeStatus(lexeme.id, status)}
                            />,
                            {
                                icon: 'edit',
                                title: 'Редактировать слово',
                                onClick: () => setEditingLexeme(lexeme)
                            },
                            {
                                icon: 'delete',
                                title: 'Удалить слово',
                                onClick: () => handleDeleteLexeme(lexeme.id)
                            }] : [{
                            icon: 'add',
                            title: 'Добавить слово',
                            onClick: () => handleAddLexeme(lexeme)
                        }];
                    }}
                    onViewLexeme={setViewingLexeme}
                />

                {viewingLexeme &&
                    <LexemeView
                        as={Dialog}
                        open
                        onClose={handleModalClose}
                    >
                        <Lexeme
                            lexeme={viewingLexeme}
                            readOnly={user.isTeacher}
                            onStatusUpdate={handleUpdateLexemeStatus}
                        />
                    </LexemeView>
                }

                {editingLexeme &&
                    <LexemeView
                        as={FormDialog}
                        open
                        onClose={handleModalClose}
                    >
                        <LexemeForm
                            id="lexeme-edit-form"
                            lexeme={editingLexeme}
                            onSubmit={handleUpdateLexeme}
                        />
                    </LexemeView>
                }
            </Surface>

        </>

    );
}