import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LexemesList from 'shared/components/lexemes-list';
import LexemesSearch from 'shared/components/lexemes-search';
import { LMS_URL } from 'shared/constants';
import { useIsMobile } from 'shared/hooks/screen';
import { useVocabularyActions } from 'shared/hooks/vocabularies';
import { Dialog, IconButton, Menu } from 'shared/ui-components';

import Lexeme from 'lms/components/vocabulary/lexeme';
import LexemeForm from 'lms/components/vocabulary/lexeme-form';
import LexemeStatus from 'lms/components/vocabulary/lexeme-status';
import LexemeView from 'lms/components/vocabulary/lexeme-view';

import styles from './Vocabulary.module.scss';

const SEARCH_URL = `${LMS_URL}/api/vocabularies/search`;

export default function Vocabulary({
    vocabulary,
    learnerId,
    userId,
    inline
}) {
    const actions = useVocabularyActions();
    const isMobile = useIsMobile();

    const [viewingLexeme, setViewingLexeme] = useState(null);
    const [editingLexeme, setEditingLexeme] = useState(null);

    const vocabularyId = vocabulary?.id;
    const isMain = vocabularyId === 'my';
    const isOwn = userId === learnerId;
    const isDelegated = userId !== learnerId;

    const handleAddLexeme = useCallback(data => {
        return actions.addLexeme(vocabularyId, {
            data,
            learnerId
        });
    }, [actions, vocabularyId, learnerId]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(vocabularyId, editingLexeme?.id, {
            data,
            learnerId
        }).finally(() => setEditingLexeme(null));
    }, [actions, vocabularyId, editingLexeme?.id, learnerId]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return actions.deleteLexeme(vocabularyId, lexemeId, { learnerId });
        }
    }, [actions, vocabularyId, learnerId]);

    const handleRemoveLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите убрать слово из словаря? Оно останется в общем списке.')) {
            return actions.deleteLexeme(vocabularyId, lexemeId);
        }
    }, [actions, vocabularyId]);

    const handleUpdateLexemeStatus = useCallback((lexemeId, status) => {
        return actions.updateLexemeStatus(lexemeId, status);
    }, [actions]);

    const handleModalClose = useCallback(() => {
        setViewingLexeme(null);
        setEditingLexeme(null);
    }, []);

    const lexemes = vocabulary?.lexemes;
    const showHeader = !inline || (!viewingLexeme && !editingLexeme);
    const teacherIsInline = isDelegated && inline;

    return (
        <div className={styles.root}>
            {showHeader &&
                <div className={styles.header}>
                    <LexemesSearch
                        className={styles.search}
                        url={SEARCH_URL}
                        isResultDisabled={result =>
                            !!lexemes.find(lexeme => lexeme.id === result.id)
                        }
                        renderResultItemAction={result => result.disabled ?
                            'Уже в словаре' :
                            <IconButton
                                icon="add"
                                title="Добавить слово в словарь"
                                variant="soft"
                                onClick={() => handleAddLexeme(result.data)}
                            />
                        }
                        onAddLexeme={handleAddLexeme}
                        onSelectLexeme={handleAddLexeme}
                    />
                </div>
            }

            {showHeader &&
                <div className={styles.body}>
                    <LexemesList
                        lexemes={lexemes}
                        renderLexemeActions={lexeme => {
                            const iconButtons = isOwn && [
                                {
                                    key: 'edit',
                                    icon: 'edit',
                                    title: 'Редактировать слово',
                                    onClick: () => setEditingLexeme(lexeme)
                                },
                                isMain ? {
                                    key: 'delete',
                                    icon: 'delete',
                                    title: 'Удалить слово',
                                    onClick: () => handleDeleteLexeme(lexeme.id)
                                } : {
                                    key: 'remove',
                                    icon: 'remove',
                                    title: 'Убрать слово',
                                    onClick: () => handleRemoveLexeme(lexeme.id)
                                }
                            ];

                            return [
                                <LexemeStatus
                                    key={lexeme.id}
                                    level={lexeme.status}
                                    readOnly={teacherIsInline}
                                    onChange={status => handleUpdateLexemeStatus(lexeme.id, status)}
                                />,
                                ...(isMobile
                                    ? [
                                        <Menu
                                            key="menu"
                                            trigger={<IconButton icon="more_vert" variant="outlined" />}
                                            items={iconButtons}
                                        />
                                    ]
                                    : iconButtons)
                            ];
                        }}
                        onViewLexeme={setViewingLexeme}
                    />
                </div>
            }

            {viewingLexeme &&
                <LexemeView
                    as={Dialog}
                    inline={inline}
                    open
                    onClose={handleModalClose}
                >
                    <Lexeme
                        lexeme={viewingLexeme}
                        readOnly={isDelegated}
                        onStatusUpdate={handleUpdateLexemeStatus}
                    />
                </LexemeView>
            }

            {editingLexeme &&
                <LexemeView
                    as={FormDialog}
                    inline={inline}
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
        </div>
    );
}