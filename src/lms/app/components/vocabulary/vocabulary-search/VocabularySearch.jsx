import SearchForm from 'shared/components/search-form';
import { LMS_URL } from 'shared/constants';

import VocabularySearchResultItem from './VocabularySearchResultItem';

const apiUrl = `${LMS_URL}/api/vocabularies/search`;

export default function VocabularySearch({ lexemes, onAddLexeme, className }) {
    function isOptionDisabled(option) {
        return !!lexemes.find(lexeme => lexeme.id === option.id);
    }

    return  (
        <div className={className}>
            <SearchForm
                apiUrl={apiUrl}
                placeholder="Поиск слов"
                params={{
                    limit: 3
                }}
                isResultDisabled={isOptionDisabled}
                renderResult={result =>
                    <VocabularySearchResultItem
                        result={result}
                        lexemes={lexemes}
                        onAddLexeme={onAddLexeme}
                    />
                }
                withShowMoreBtn
            />
        </div>
    );
}