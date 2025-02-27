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

const filters = {
    all: () => true,
    new: lexeme => lexeme.status === 0,
    learning: lexeme => lexeme.status > 0 && lexeme.status < 5,
    learned: lexeme => lexeme.status === 5
};

export default function VocabularyLexemes({
    vocabulary,
    user,
    learnerId,
    inline
}) {
    const actions = useVocabularyActions();
    const [modalState, setModalState] = useState({ type: null, lexeme: null });
    const [selectedLexemeIds, setSelectedLexemeIds] = useState([]);
    const [filter, setFilter] = useState('all');

    const vocabularyId = vocabulary?.id;
    const isTeacher = user.isTeacher;
    const lexemes = vocabulary.lexemes.filter(filters[filter]);
    const showHeader = !inline || !modalState.lexeme;
    const showList = showHeader;
    const readOnly = isTeacher;

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

    const handleSelectLexeme = useCallback(lexemeId => {
        setSelectedLexemeIds(ids => {
            const isSelected = ids.includes(lexemeId);

            return isSelected ?
                ids.filter(id => id !== lexemeId) :
                ids.concat(lexemeId);
        });
    }, []);

    const handleUpdateLexemeStatus = useCallback((lexemeId, status) => {
        return actions.updateLexemeStatus(lexemeId, status);
    }, [actions]);

    return (
        <div className={styles.root}>
            {showHeader &&
                <div className={styles.header}>
                    {/* Временно отключили */}
                    {/* <Checkbox
                        checked={false}
                        onChange={() => console.log('check')}
                    /> */}

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
                        user={user}
                        lexemes={lexemes}
                        readOnly={readOnly}
                        onViewLexeme={lexeme => handleModalOpen('view-lexeme', lexeme)}
                        onEditLexeme={lexeme => handleModalOpen('edit-lexeme', lexeme)}
                        onSelectLexeme={handleSelectLexeme}
                        onDeleteLexeme={handleDeleteLexeme}
                        onUpdateLexemeStatus={handleUpdateLexemeStatus}
                    />
                }

                {modalState.lexeme && (
                    <LexemeView
                        as={inline ? undefined : Dialog}
                        open={modalState.type === 'view-lexeme'}
                        onClose={handleModalClose}
                    >
                        <Lexeme
                            lexeme={modalState.lexeme}
                            readOnly={readOnly}
                            onStatusUpdate={handleUpdateLexemeStatus}
                            onClose={handleModalClose}
                        />
                    </LexemeView>
                )}

                {modalState.lexeme && (
                    <LexemeView
                        as={inline ? undefined : FormDialog}
                        open={modalState.type === 'edit-lexeme'}
                        onClose={handleModalClose}
                    >
                        <LexemeForm
                            id="lexeme-edit-form"
                            lexeme={modalState.lexeme}
                            onSubmit={handleUpdateLexeme}
                            onClose={handleModalClose}
                        />
                    </LexemeView>
                )}
            </div>
        </div>
    );
}