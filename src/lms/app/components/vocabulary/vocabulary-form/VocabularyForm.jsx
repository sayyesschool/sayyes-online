import { useForm } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';

export default function VocabularyForm({ lexeme, onSubmit, ...props }) {
    const { data, handleChange, handleSubmit } = useForm({
        values: {
            value: lexeme.value,
            translation: lexeme.translations[0]
        },
        onSubmit
    }, [lexeme.updatedAt]);

    return (
        <Form className="VocabularyForm" onSubmit={handleSubmit} {...props}>
            <Form.Input
                label="Значение"
                name="value"
                value={data.value.value}
                disabled
                onChange={handleChange}
            />

            <Form.Input
                label="Перевод"
                name="translation"
                value={data.translation.value}
                onChange={handleChange}
            />
        </Form>
    );
}