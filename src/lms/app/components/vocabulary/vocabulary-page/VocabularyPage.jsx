import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useForm } from 'shared/hooks/form';
import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { useVocabulary } from 'shared/hooks/vocabularies';
import { Button, Checkbox, Flex, Form, Icon, List, Select } from 'shared/ui-components';

import LexemeItem from 'lms/components/vocabulary/lexeme-item';
import VocabularyForm from 'lms/components/vocabulary/vocabulary-form';

export default function VocabularyPage({ match }) {
    const vocabularyId = match.params.vocabulary;
    const [isDialogOpen, toggleDialogOpen] = useBoolean(false);
    const [currentLexeme, setCurrentLexeme] = useState(null);
    const [user] =  useUser();
    const [vocabulary, actions] = useVocabulary(vocabularyId);
    const userId = user.id;

    const handleDeleteLexeme = useCallback(lexemeId => {
        return actions.deleteLexeme(vocabularyId, lexemeId);
    }, [actions, vocabularyId]);

    const handleAddLexeme = useCallback(data => {
        return actions.addLexeme(vocabularyId, data);
    }, [actions, vocabularyId]);

    const handleUpdateLexeme = useCallback(data => {
        return actions.updateLexeme(vocabularyId, currentLexeme.id, data)
            .finally(() => toggleDialogOpen(false));;
    }, [actions, currentLexeme?.id, toggleDialogOpen, vocabularyId]);

    const { data, handleChange, handleSubmit } = useForm({
        values: {
            value: '',
            translation: ''
        },
        onSubmit: handleAddLexeme
    });

    if (!vocabulary) return <LoadingIndicator />;

    const { title, lexemes, numberOfLexemes } = vocabulary;
    const vocabularyTitle = `${title} (${numberOfLexemes})`;

    return (
        <Page className="Vocabulary">
            <Page.Content className="VocabularyPageContent">
                <Flex className="Vocabulary__header">
                    <Checkbox
                        checked={false}
                        onChange={() => console.log('check')}
                    />

                    <Select
                        name='VocabularySelect'
                        className="Vocabulary__select"
                        defaultValue="my-vocabulary"
                        onChange={() => console.log('search')}
                    >
                        <Select.Option value="my-vocabulary">{vocabularyTitle}</Select.Option>
                        <Select.Option value="course">Course vocabulary</Select.Option>
                        <Select.Option value="extra">Extra vocabulary</Select.Option>
                    </Select>

                    <Form.Input
                        endDecorator={<Icon>search</Icon>}
                        placeholder="Поиск"
                        className="Vocabulary__search"
                        onChange={() => console.log('search')}
                    />

                    <Form className="VocabularyForm" onSubmit={handleSubmit}>
                        <Form.Input
                            name="value"
                            placeholder="Слово"
                            className="Vocabulary__input"
                            value={data.value.value}
                            onChange={handleChange}
                        />

                        <Form.Input
                            name="translation"
                            placeholder="Перевод"
                            className="Vocabulary__input"
                            value={data.translation.value}
                            onChange={handleChange}
                        />

                        <Button type="submit" content="Добавить слово" />
                    </Form>
                </Flex>

                <List className="Vocabulary__body">
                    {lexemes?.map(lexeme =>
                        <LexemeItem
                            key={lexeme.id}
                            userId={userId}
                            lexeme={lexeme}
                            handleDeleteLexeme={handleDeleteLexeme}
                            setCurrentLexeme={setCurrentLexeme}
                            toggleDialogOpen={toggleDialogOpen}
                        />)}
                </List>

                <FormDialog
                    title="Редактирование"
                    open={isDialogOpen}
                    onClose={toggleDialogOpen}
                >
                    <VocabularyForm
                        id="vocabulary-form"
                        lexeme={currentLexeme}
                        onSubmit={handleUpdateLexeme}
                    />
                </FormDialog>
            </Page.Content>
        </Page>
    );
}