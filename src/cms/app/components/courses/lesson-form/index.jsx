import { useForm } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';

const defaultLesson = {
    title: '',
    slug: '',
    description: ''
};

export default function LessonForm({ lesson = defaultLesson, onSubmit, ...props }) {
    const { data, handleChange, handleSubmit } = useForm({
        values: {
            'title*': lesson.title,
            'slug*': lesson.slug,
            description: lesson.description
        },
        onSubmit
    }, [lesson.updatedAt]);

    return (
        <Form className="lesson-form" onSubmit={handleSubmit} noValidate {...props}>
            <Form.Input
                {...data.title}
                label="Название"
                onChange={handleChange}
            />

            <Form.Input
                {...data.slug}
                label="Слаг"
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