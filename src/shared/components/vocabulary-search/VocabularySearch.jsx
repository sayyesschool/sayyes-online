import { useCallback, useRef, useState } from 'react';

import LexemeSimpleForm from 'shared/components/lexeme-simple-form';
import SearchForm from 'shared/components/search-form';
import { LMS_URL } from 'shared/constants';
import { Popover } from 'shared/ui-components';

import VocabularySearchResultItem from './VocabularySearchResultItem';

const apiUrl = `${LMS_URL}/api/vocabularies/search`;

export default function VocabularySearch({ lexemes, onAddLexeme, className }) {
    const comboboxRef = useRef();

    const [newLexeme, setNewLexeme] = useState();

    const handleSubmit = useCallback(data => {
        onAddLexeme(data).finally(() => setNewLexeme(null));
    }, [onAddLexeme]);

    const handleCreate = useCallback(value => {
        setNewLexeme({ value });
    }, []);

    return (
        <div className={className}>
            <SearchForm
                comboboxRef={comboboxRef}
                apiUrl={apiUrl}
                placeholder="Поиск слов"
                params={{
                    limit: 10
                }}
                isResultDisabled={option =>
                    !!lexemes.find(lexeme => lexeme.id === option.id)
                }
                renderResult={result =>
                    <VocabularySearchResultItem
                        result={result}
                        lexemes={lexemes}
                        onAddLexeme={onAddLexeme}
                    />
                }
                creatable
                onCreate={handleCreate}
            />

            {newLexeme &&
                <Popover
                    anchor={comboboxRef.current}
                    placement="bottom-start"
                    open
                >
                    <LexemeSimpleForm
                        lexeme={newLexeme}
                        onSubmit={handleSubmit}
                    />
                </Popover>
            }
        </div>
    );
}