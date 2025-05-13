import { useCallback, useEffect, useState } from 'react';

import LexemesList from 'shared/components/lexemes-list';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useLexiconApi } from 'shared/hooks/lexicon';
import { useUser } from 'shared/hooks/user';
import { Dialog, IconButton, Surface } from 'shared/ui-components';

import Lexeme from 'lms/components/vocabulary/lexeme';
import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

export default function VocabularyItem({
    learnerId,
    lexemeIds,
    className
}) {
    const [user] = useUser();
    const {
        getLexemes,
        addLexeme,
        addLexemes,
        updateLexemeStatus,
        deleteLexeme
    } = useLexiconApi();

    const [lexemes, setLexemes] = useState(null);
    const [viewingLexeme, setViewingLexeme] = useState();

    const newLexemeIds = lexemes?.filter(({ data }) => !data).map(({ id }) => id);
    const disableAddAllBtn = newLexemeIds?.length === 0;

    useEffect(() => {
        getLexemes(lexemeIds)
            .then(setLexemes);
    }, []);

    const updateList = useCallback(lexeme => {
        setLexemes(lexemes => lexemes.map(l => l.id === lexeme.id ? lexeme : l));
    }, []);

    const handleAddLexeme = useCallback(data => {
        return addLexeme(data)
            .then(lexeme => {
                updateList(lexeme);
            });
    }, [addLexeme, updateList]);

    const handleAddAllLexemes = useCallback(() => {
        return addLexemes(newLexemeIds)
            .then(({ data }) => {
                setLexemes(prev =>
                    prev.map(item => data.find(u => u.id === item.id) || item)
                );
            });
    }, [newLexemeIds, addLexemes]);

    const handleUpdateLexemeStatus = useCallback((lexemeId, status) => {
        return updateLexemeStatus(lexemeId, { status })
            .then(lexeme => {
                updateList(lexeme);
            });
    }, [updateLexemeStatus, updateList]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return deleteLexeme(lexemeId)
                .then(lexeme => {
                    updateList(lexeme);
                });
        } else {
            return Promise.resolve();
        }
    }, [deleteLexeme, updateList]);

    if (!lexemes) return <LoadingIndicator />;

    return (
        <div className={className}>
            <Surface variant="outlined">
                <LexemesList
                    lexemes={lexemes}
                    renderLexemeActions={lexeme => {
                        if (!learnerId) return [];

                        return lexeme.data ? [
                            <LexemeStatus
                                key={lexeme.id}
                                level={lexeme.status}
                                readOnly={user.isTeacher}
                                onChange={status => handleUpdateLexemeStatus(lexeme.id, status)}
                            />,
                            {
                                icon: 'remove',
                                title: 'Удалить слово из словаря',
                                onClick: () => handleDeleteLexeme(lexeme.id)
                            }
                        ] : [
                            {
                                icon: 'add',
                                title: 'Добавить слово в словарь',
                                onClick: () => handleAddLexeme(lexeme)
                            }
                        ];
                    }}
                    onViewLexeme={setViewingLexeme}
                />

                {learnerId &&
                    <IconButton
                        title="Добавить все слова"
                        icon="add"
                        disabled={disableAddAllBtn}
                        onClick={handleAddAllLexemes}
                    />
                }
            </Surface>

            {viewingLexeme &&
                <Dialog
                    open
                    onClose={() => setViewingLexeme(null)}
                >
                    <Lexeme
                        lexeme={viewingLexeme}
                        readOnly={user.isTeacher}
                        onStatusUpdate={handleUpdateLexemeStatus}
                    />
                </Dialog>
            }
        </div>
    );
}