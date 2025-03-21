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

import styles from './VocabularyLexemes.module.scss';

const SEARCH_URL = `${LMS_URL}/api/vocabularies/search`;

export default function VocabularyLexemes({
    vocabulary,
    user,
    learnerId,
    inline
}) {
    const actions = useVocabularyActions();
    const isMobile = useIsMobile();

    const [viewingLexeme, setViewingLexeme] = useState(null);
    const [editingLexeme, setEditingLexeme] = useState(null);

    const vocabularyId = vocabulary?.id;
    const { isTeacher } = user;

    const handleAddLexeme = useCallback(data => {
        if (isTeacher) {
            data = { ...data, learnerId };
        }

        return actions.addLexeme(vocabularyId, data);
    }, [isTeacher, learnerId, vocabularyId, actions]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(vocabularyId, editingLexeme?.id, data)
            .finally(() => setEditingLexeme(null));
    }, [actions, vocabularyId, editingLexeme?.id]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
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
    const teacherIsInline = isTeacher && inline;

    return (
        <div className={styles.root}>
            {showHeader &&
                <div className={styles.header}>
                    <LexemesSearch
                        className={styles.search}
                        url={SEARCH_URL}
                        lexemes={lexemes}
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
                    />
                </div>
            }

            {showHeader &&
                <div className={styles.body}>
                    <LexemesList
                        lexemes={lexemes}
                        renderLexemeActions={lexeme => {
                            const iconButtons = [!teacherIsInline && {
                                key: 'edit',
                                icon: 'edit',
                                title: 'Редактировать слово',
                                onClick: () => setEditingLexeme(lexeme)
                            },
                            !teacherIsInline && {
                                key: 'delete',
                                icon: 'delete',
                                title: 'Удалить слово',
                                onClick: () => handleDeleteLexeme(lexeme.id)
                            }];

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
                        readOnly={isTeacher}
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