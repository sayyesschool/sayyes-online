import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LexemesList from 'shared/components/lexemes-list';
import VocabularySearch from 'shared/components/vocabulary-search';
import { LMS_URL } from 'shared/constants';
import { useVocabularyActions } from 'shared/hooks/vocabularies';
import { Dialog } from 'shared/ui-components';

import Lexeme from 'lms/components/vocabulary/lexeme';
import LexemeForm from 'lms/components/vocabulary/lexeme-form';
import LexemeView from 'lms/components/vocabulary/lexeme-view';

import styles from './VocabularyLexemes.module.scss';

export default function VocabularyLexemes({
    vocabulary,
    user,
    learnerId,
    inline
}) {
    const actions = useVocabularyActions();
    const [modalState, setModalState] = useState({ type: null, lexeme: null });

    const vocabularyId = vocabulary?.id;
    const isTeacher = user.isTeacher;
    const lexemes = vocabulary?.lexemes;
    const showHeader = !inline || !modalState.lexeme;
    const showList = showHeader;

    const handleModalOpen = useCallback((type, lexeme = null) => {
        setModalState({ type, lexeme });
    }, []);

    const handleModalClose = useCallback(() => {
        setModalState({ type: null, lexeme: null });
    }, []);

    const handleAddLexeme = useCallback(data => {
        if (isTeacher) {
            data = { ...data, learnerId };
        }

        return actions.addLexeme(vocabularyId, data)
            .finally(() => setModalState({ type: null, lexeme: null }));
    }, [isTeacher, learnerId, vocabularyId, actions]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(vocabularyId, modalState.lexeme.id, data)
            .finally(() => setModalState({ type: null, lexeme: null }));
    }, [actions, vocabularyId, modalState.lexeme?.id]);

    const handleDeleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return actions.deleteLexeme(vocabularyId, lexemeId);
        }
    }, [actions, vocabularyId]);

    const handleUpdateLexemeStatus = useCallback((lexemeId, status) => {
        return actions.updateLexemeStatus(lexemeId, status);
    }, [actions]);

    const renderModalContent = () => {
        if (!modalState.lexeme) return null;

        let ChildComponent;
        let ParentComponent;

        switch (modalState.type) {
            case 'view-lexeme':
                ParentComponent = Dialog;
                ChildComponent = (
                    <Lexeme
                        lexeme={modalState.lexeme}
                        readOnly={isTeacher}
                        onStatusUpdate={handleUpdateLexemeStatus}
                        onClose={handleModalClose}
                    />
                );
                break;
            case 'edit-lexeme':
                ParentComponent = FormDialog;
                ChildComponent = (
                    <LexemeForm
                        id="lexeme-edit-form"
                        lexeme={modalState.lexeme}
                        onSubmit={handleUpdateLexeme}
                        onClose={handleModalClose}
                    />
                );
                break;
            default:
                return null;
        }

        return (
            <LexemeView
                as={inline ? undefined : ParentComponent}
                open
                onClose={handleModalClose}
            >
                {ChildComponent}
            </LexemeView>
        );
    };

    return (
        <div className={styles.root}>
            {showHeader &&
                <div className={styles.header}>
                    <VocabularySearch
                        className={styles.search}
                        lexemes={lexemes}
                        domain={LMS_URL}
                        onAddLexeme={handleAddLexeme}
                    />
                </div>
            }

            <div className={styles.body}>
                {showList &&
                    <LexemesList
                        inline={inline}
                        user={user}
                        lexemes={lexemes}
                        onViewLexeme={lexeme => handleModalOpen('view-lexeme', lexeme)}
                        onEditLexeme={lexeme => handleModalOpen('edit-lexeme', lexeme)}
                        onDeleteLexeme={handleDeleteLexeme}
                        onUpdateLexemeStatus={handleUpdateLexemeStatus}
                    />
                }

                {renderModalContent()}
            </div>
        </div>
    );
}