import { useForm } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';

const defaultSection = {
    title: '',
    slug: '',
    description: ''
};

export default function SectionForm({ section = defaultSection, onSubmit, ...props }) {
    const { data, handleChange, handleSubmit } = useForm({
        values: {
            'title*': section.title,
            'slug*': section.slug,
            description: section.description
        },
        onSubmit
    }, [section.updatedAt]);

    return (
        <Form className="SectionForm" onSubmit={handleSubmit} noValidate {...props}>
            <Form.Input
                {...data.title}
                label="Название"
                onChange={handleChange}
            />

            <Form.Textarea
                {...data.description}
                label="Описание"
                onChange={handleChange}
            />
        </Form>
    );
}