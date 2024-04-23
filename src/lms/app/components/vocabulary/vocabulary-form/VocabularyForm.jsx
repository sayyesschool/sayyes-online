
import { useForm } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';

export default function VocabularyForm({ lexeme, onSubmit, ...props }) {
    const { data, handleChange, handleSubmit } = useForm({
        values: {
            value: lexeme.value,
            translation: lexeme.translations[0].text
        },
        onSubmit
    }, [lexeme.updatedAt]);

    return (
        <Form className="VocabularyForm" onSubmit={handleSubmit} {...props}>
            <Form.Input
                name="value"
                label="Значение"
                value={data.value.value}
                disabled
                onChange={handleChange}
            />

            <Form.Input
                name="translation"
                label="Перевод"
                value={data.translation.value}
                onChange={handleChange}
            />
        </Form>
    );
}