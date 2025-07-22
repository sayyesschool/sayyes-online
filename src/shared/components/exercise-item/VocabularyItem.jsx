import { useCallback, useEffect, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LexemesList from 'shared/components/lexemes-list';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useLexiconApi } from 'shared/hooks/lexicon';
import { useUser } from 'shared/hooks/user';
import { Button, Dialog, Flex, Surface } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import Lexeme from 'lms/components/vocabulary/lexeme';
import LexemeForm from 'lms/components/vocabulary/lexeme-form';
import LexemeStatus from 'lms/components/vocabulary/lexeme-status';
import LexemeView from 'lms/components/vocabulary/lexeme-view';
import { useLearnerContext } from 'lms/contexts/learner';

import styles from './VocabularyItem.module.scss';

export default function VocabularyItem({
    lexemeIds,
    className
}) {
    const [user] = useUser();
    const {
        getLexemes,
        addLexeme,
        addLexemes,
        updateLexeme,
        updateLexemeStatus,
        deleteLexeme
    } = useLexiconApi();
    const { learnerId } = useLearnerContext();

    const [lexemes, setLexemes] = useState(null);
    const [viewingLexeme, setViewingLexeme] = useState();
    const [editingLexeme, setEditingLexeme] = useState();
    const [isLoading, setLoading] = useState(false);

    const newLexemeIds = lexemes?.filter(({ status }) => status === undefined).map(({ id }) => id);
    const disableAddAllButton = newLexemeIds?.length === 0 || isLoading;

    useEffect(() => {
        getLexemes(lexemeIds)
            .then(setLexemes);
    }, []);

    const updateLexemes = useCallback(lexeme => {
        setLexemes(lexemes => lexemes.map(l => l.id === lexeme.id ? { ...l, ...lexeme } : l));
    }, []);

    const handleAddLexeme = useCallback(data => {
        return addLexeme({ data, learnerId })
            .then(lexeme => {
                updateLexemes(lexeme);
            });
    }, [learnerId, addLexeme, updateLexemes]);

    const handleAddAllLexemes = useCallback(() => {
        setLoading(true);

        return addLexemes(newLexemeIds, { learnerId })
            .then(addedLexemes => {
                setLexemes(prev =>
                    prev.map(lexeme => addedLexemes.find(l => l.id === lexeme.id) || lexeme)
                );
            }).finally(() => {
                setLoading(false);
            });
    }, [newLexemeIds, learnerId, addLexemes]);

    const handleUpdateLexeme = useCallback(data => {
        return updateLexeme(editingLexeme?.id, {
            data,
            learnerId
        }).then(lexeme => {
            updateLexemes(lexeme);
            setEditingLexeme(null);
        });
    }, [editingLexeme?.id, learnerId, updateLexeme, updateLexemes]);

    const handleUpdateLexemeStatus = useCallback((lexemeId, status) => {
        return updateLexemeStatus(lexemeId, { learnerId, status })
            .then(lexeme => {
                updateLexemes(lexeme);
            });
    }, [learnerId, updateLexemeStatus, updateLexemes]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return deleteLexeme(lexemeId, { learnerId })
                .then(lexeme => {
                    setLexemes(lexemes => lexemes.map(l => l.id === lexeme.id ? lexeme : l));
                });
        } else {
            return Promise.resolve();
        }
    }, [deleteLexeme, learnerId]);

    if (!lexemes) return <LoadingIndicator />;

    return (
        <div className={cn(className, styles.root)}>
            <Flex align="center" justify="space-between">
                <span className="overline">Vocabulary</span>

                {learnerId &&
                    <Button
                        content="Добавить все слова в словарь"
                        icon="add"
                        size="sm"
                        variant="plain"
                        disabled={disableAddAllButton}
                        loading={isLoading}
                        onClick={handleAddAllLexemes}
                    />
                }
            </Flex>

            <Surface variant="outlined">
                <LexemesList
                    lexemes={lexemes}
                    renderLexemeActions={lexeme => {
                        if (!learnerId) return [];

                        return lexeme.record ? [
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

            {editingLexeme &&
                <LexemeView
                    as={FormDialog}
                    open
                    onClose={() => setEditingLexeme(null)}
                >
                    <LexemeForm
                        id="lexeme-edit-form"
                        lexeme={editingLexeme}
                        onSubmit={handleUpdateLexeme}
                    />
                </LexemeView>
            }
        </div>
    );
}