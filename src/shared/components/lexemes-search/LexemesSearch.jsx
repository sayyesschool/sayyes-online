import { useCallback, useRef, useState } from 'react';

import LexemeSimpleForm from 'shared/components/lexeme-simple-form';
import SearchForm from 'shared/components/search-form';
import { Popover } from 'shared/ui-components';

import LexemesSearchResultItem from './LexemesSearchResultItem';

export default function LexemesSearch({
    url,
    isResultDisabled,
    renderResultItem,
    renderResultItemAction,
    onAddLexeme,
    onSelectLexeme,
    className
}) {
    const comboboxRef = useRef();

    const [newLexeme, setNewLexeme] = useState();

    const handleSubmit = useCallback(data => {
        return onAddLexeme(data).finally(() => setNewLexeme(null));
    }, [onAddLexeme]);

    const handleCreate = useCallback(value => {
        setNewLexeme({ value });
    }, []);

    return (
        <div className={className}>
            <SearchForm
                comboboxRef={comboboxRef}
                placeholder="Поиск слов"
                url={url}
                params={{
                    limit: 10
                }}
                isResultDisabled={isResultDisabled}
                renderResult={result => renderResultItem?.(result) ||
                    <LexemesSearchResultItem
                        result={result}
                        action={renderResultItemAction?.(result)}
                        onSelect={onSelectLexeme}
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
                    onClose={() => setNewLexeme(null)}
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