import { useForm } from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';
import FormTextArea from 'shared/components/form-textarea';

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
            <FormInput
                {...data.title}
                label="Название"
                onChange={handleChange}
            />

            <FormInput
                {...data.slug}
                label="Слаг"
                onChange={handleChange}
            />

            <FormTextArea
                {...data.description}
                label="Описание"
                onChange={handleChange}
            />
        </Form>
    );
}