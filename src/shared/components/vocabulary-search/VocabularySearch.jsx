
import SearchForm from 'shared/components/search-form';
import SearchLexemeItem from 'shared/components/search-lexeme-item';

export default function VocabularySearch({ lexemes, addLexeme, deleteLexeme }) {
    return  (
        <SearchForm
            apiUrl="https://lms.sayyes.local/api/vocabularies/search"
            limit={3}
            placeholder="Поиск слов"
            withShowMoreBtn={true}
            optionItem={SearchLexemeItem}
            optionItemProps={{ lexemes, deleteLexeme, addLexeme }}
        />
    );
}